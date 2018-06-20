#!/bin/bash
# reads from ./subscribed.txt
# make sure this file has Linux line delimeters!
# run this solo, or optionally output subscribe commands to a file
# gs [add <FILENAME>]


if [[ $# > 1 && $1 != "add" ]]; then
	echo "Only available option is add [FILENAME]. Got $1"
	exit 1
fi

# clears the output file
if [[ $# > 1 ]]; then
	echo "" > $2
fi

OSCRepos=`curl https://api.github.com/orgs/OSC/repos | jq -r '.[] | .full_name'`
AweSimRepos=`curl https://api.github.com/orgs/AweSim-OSC/repos | jq -r '.[] | .full_name'`
SlackSubs=`cat ./subscribed.txt`
Unsubbed=""

for OSCRepo in $OSCRepos; do
	if ! grep $OSCRepo ./subscribed.txt > /dev/null; then
		Unsubbed+=`echo "$OSCRepo
		"`
	fi
done

for AweSimRepo in $AweSimRepos; do
	if ! grep $AweSimRepo ./subscribed.txt > /dev/null; then
		Unsubbed+=`echo "$AweSimRepo
		"`
	fi
done

if [ Unsubbed == "" ]; then
	echo "All repos subscribed"
else
	echo "These repos are unsubscribed:"
	for i in $Unsubbed; do
		echo $i
	done
fi

if [[ $# > 1 ]]; then
	for i in $Unsubbed; do
		echo "/github subscribe $i" >> $2
	done
fi
