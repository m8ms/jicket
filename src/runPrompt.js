const inquirer = require("inquirer");
const searchList = require("inquirer-search-list");
const createBranch = require("./createBranch");

function runPrompt(issues) {
  inquirer.registerPrompt("searchlist", searchList);

  inquirer
    .prompt([
      {
        type: "searchlist",
        message: "Type",
        name: "type",
        choices: ["feat", "fix", "refactor", "chore", "build", "revert"],
      },
      {
        type: "searchlist",
        message: "Issue ID",
        name: "key",
        choices: issues.map(({ key, fields }) => ({
          name: `${key} ${fields.summary}`,
          value: key,
        })),
      },
      {
        type: "input",
        message: "Body",
        name: "body",
        default: (answers) => {
          const { fields } =
            issues.find(({ key }) => answers.key === key) || {};

          return fields && fields.summary;
        },
      },
    ])
    .then(createBranch)
    .catch(console.log);
}

module.exports = runPrompt;
