const chalk = require("chalk");
const simpleGit = require("simple-git");

async function createBranch({ key, type, body }) {
  const branchName = `${type}/${key}/${body.replace(/ /g, "-")}`;

  const git = simpleGit();

  await git.checkoutLocalBranch(branchName);

  console.log(
    chalk.green(`Created and switched to local branch: ${branchName}`)
  );
}

module.exports = createBranch;
