# jicket
Lists all jira issues assigned to user. Helps creating new branch with name formatted like: `type/ISSUE-ID/description` 
(e.g. `feat/UFO-666/add-obduction-mode`).

### Usage
* casually
    ```shell script
    npx jic
    ```
* permanently:
    ```shell script
    npm install jicket -g
    ```
    and then:
    ```shell script
    jic
    ```

### First run & setup

When you run the script for the first time,
it will ask you to provide this essential information:
* your JIRA server address (ex. `your-company.atlasian.com`),
* your JIRA user name,
* personal access token, which can be found at: [https://id.atlassian.com/manage-profile/security/api-tokens](https://id.atlassian.com/manage-profile/security/api-tokens).

### Resetting config
The settings are written to: `<your_home_dir>/.jicket_config`. 

You can update them by running: 
```shell script
jic -c
```
