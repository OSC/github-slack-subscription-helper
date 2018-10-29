#!/bin/bash

i=1
tmp=`curl https://api.github.com/orgs/OSC/repos?page=$i | jq -r '.[] | .full_name'`
until [[ $tmp == "" ]]; do
	OSCRepos+="$tmp
	"
	i=$(( i + 1 ))
	tmp=`curl https://api.github.com/orgs/OSC/repos?page=$i | jq -r '.[] | .full_name'`
done

i=1
tmp=`curl https://api.github.com/orgs/AweSim-OSC/repos?page=$i | jq -r '.[] | .full_name'`
until [[ $tmp == "" ]]; do
        AweSimRepos+="$tmp
	"
        i=$(( i + 1 ))
        tmp=`curl https://api.github.com/orgs/AweSim-OSC/repos?page=$i | jq -r '.[] | .full_name'`
done

for OSCRepo in $OSCRepos; do
	if ! grep -x $OSCRepo ./subscribed.txt > /dev/null; then
		Unsubbed+=`echo "$OSCRepo
		"`
	fi
done

for AweSimRepo in $AweSimRepos; do
	if ! grep -x $AweSimRepo ./subscribed.txt > /dev/null; then
		Unsubbed+=`echo "$AweSimRepo
		"`
	fi
done

if [[ $Unsubbed == "" ]]; then
	echo "All repos subscribed"
else
	echo "These repos are unsubscribed:"
	for i in $Unsubbed; do
		echo $i
	done
	echo

	echo "To subscribe to these repos, enter the following commands in the Slack channel:"
	for i in $Unsubbed; do
		echo "/github subscribe $i"
	done
fi
