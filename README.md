# GitHub Slack Subscription Helper Script

## Prereqs

- Make sure `jq` is installed and available in $PATH
    - Used in the script to parse the JSON retrieved from GitHub
    - Available for many platforms at https://stedolan.github.io/jq/

## Usage

- Issue the command `/github subscribe list` in #dev-notifications in Slack
- Copy the list of repos into 'subscribed.txt'
    - Overwrite the comment that is there
    - Make sure the file has Linux line delimeters!
- Run `./gs`
- The script will read from 'subscribed.txt' and print out whether all the repos are subscribed to, or if not, which ones are not subscribed to and the commands to subscribe to them
- Issue the commands shown to Slack to subscribe to the missing repos
