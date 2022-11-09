#!/bin/zsh
imgs=("${(@f)$(fd . --type file --exec file --mime-type | rg '^(\./)?(.+):\s+image/[-+.\w]+$' --replace '$2' | rg -v '\[[a-zA-Z0-9_-]{34}\]\.[^.]+$' | sort)}")


echo -n '[' > imglist.json

for img in $imgs; do
	tit="$(echo "$img" | rg '^(images/)?(.+)\..+$' --replace '$2')"
	echo -n "{\"url\":\"$img\",\"title\":\"$tit\"}," >> imglist.json
done

sed -i 's/,$/]/' imglist.json


jq '.[] | "\(.url) \(.title)"' imglist.json >/dev/null