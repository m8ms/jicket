const JiraApi = require("jira-client");

module.exports = async ({ username, host, token }) => {
  const jira = new JiraApi({
    protocol: "https",
    host,
    username,
    password: token,
    apiVersion: "2",
    strictSSL: true,
  });

  const allResults = [];
  const maxResults = 50;
  let total = Infinity;
  let startAt = 0;

  do {
    const data = await jira.searchJira(
      `assignee = ${username.replace("@", "\\u0040")}`,
      { maxResults, startAt, fields: ["status", "summary", "created"] }
    );
    startAt += maxResults;
    total = data.total;
    allResults.push(...data.issues);
  } while (total > startAt);
  return allResults;
};
