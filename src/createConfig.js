const fs = require("fs");
const inquirer = require("inquirer");

module.exports = async function createConfig(configPath, initialConfig = {}) {
  const filter = (str) => str.trim();
  const config = await inquirer.prompt([
    {
      type: "input",
      name: "host",
      message: "Jira server address",
      default: initialConfig.host,
      filter,
    },
    {
      type: "input",
      name: "username",
      message: "Jira user name",
      default: initialConfig.username,
      filter,
    },
    {
      type: "input",
      name: "token",
      message: "JIRA API token",
      default: initialConfig.token,
      filter,
    },
  ]);

  config.excludedStatuses = ["Closed", "Completed", "Cancelled"]; // TODO

  fs.writeFile(configPath, JSON.stringify(config), (err) => {
    if (err) throw err;
    console.log(
      `\nConfig saved to:\n${chalk.green(
        configPath
      )}\nRun script again to start using.\n`
    );
  });
};
