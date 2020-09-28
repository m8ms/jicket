const fs = require("fs");
const os = require("os");
const path = require("path");
const format = require("date-fns/format");
const chalk = require("chalk");
const stc = require("string-to-color");
const parseArgs = require("minimist");
const runPrompt = require("./runPrompt");
const createConfig = require("./createConfig");
const fetchAllIssues = require("./fetchAllIssues");

const args = parseArgs(process.argv.slice(2));

const FORCE_CONFIG = args.c;
const CONFIG_FILE_PATH = path.join(os.homedir(), ".jicket_config");

try {
  const configRaw = fs.readFileSync(CONFIG_FILE_PATH);
  const config = JSON.parse(configRaw);

  if (FORCE_CONFIG) {
    console.log("Overwriting config at: " + CONFIG_FILE_PATH + "\n");
    createConfig(CONFIG_FILE_PATH, config);
  } else {
    run(config);
  }
} catch (err) {
  if (err.code === "ENOENT") {
    console.log(
      "First, we must generate a config file at: " + CONFIG_FILE_PATH + "\n"
    );
    console.log('You can overwrite this config later by running "getmrs -c"\n');
    createConfig(CONFIG_FILE_PATH);
  } else {
    console.error(err);
  }
}

async function run({ excludedStatuses, ...config }) {
  const allResults = await fetchAllIssues(config);

  const issues = allResults.filter(
    ({ fields }) => !excludedStatuses.includes(fields.status.name)
  );

  issues.forEach(({ key, fields }) => {
    const color = stc(fields.status.name);

    console.log(
      key,
      "\t",
      chalk.hex(color)(`[${fields.status.name}]`),
      "\t",
      fields.summary,
      "\t",
      `(${format(new Date(fields.created), "H:mm dd.MM.y")})`
    );
  });

  if (issues.length) {
    runPrompt(issues);
  }
}
