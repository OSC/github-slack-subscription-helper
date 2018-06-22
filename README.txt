gs is the command to run
jq is a helper utility to parse JSON from GitHub
Download jq for your system at https://stedolan.github.io/jq/
Rename the executable 'jq' and place in the same directory as the gs script
Reads from ./subscribed.txt
Make sure this file has Linux line delimeters!
It will print out whether all the repos are subscribed to, or if not, which ones are not subscribed to and the commands to subscribe to them