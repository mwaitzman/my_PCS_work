#!/bin/zsh
#DEPENDENCY_VERSIONS: zsh 5.9 (x86_64-pc-linux-gnu), yt-dlp 2022.10.04, find (GNU findutils) 4.9.0, xargs (GNU findutils) 4.9.0, grep (GNU grep) 3.8, ripgrep 13.0.0 (rev eab044d829) ( (+SIMD -AVX (compiled) +SIMD +AVX (runtime) ), fd 8.5.2, sed (GNU sed) 4.8, jq-1.6



# download the videos
	yt-dlp --playlist-reverse --playlist-end 11 -S 'res:360' --prefer-free-formats --check-formats --write-thumbnail 'https://www.youtube.com/playlist?list=PLVfFIUHWy-aNaF08m34sO81dsVr4L7uI-' || exit 1



vids=("${(@f)$(find . -type f -print0 | xargs -0 file --mime-type | grep -E 'video' | rg '(./)?(.+):[^:].+$' --replace '$2' | sort)}")

imgs=("${(@f)$(fd . --type file --exec file --mime-type | rg '^(\./)?(.+):\s+image/[-+.\w]+$' --replace '$2' | rg -v '\[[a-zA-Z0-9_-]{34}\]\.[^.]+$' | sort)}")


# generate the json file for the homework
	echo -n '[' > vidlist.json

	for vid img (${vids:^imgs}) (
		tit="$(echo "$vid" | rg '^(.+)\..+$' --replace '$1')"
		if [[ "$tit" == "$(echo "$img" | rg '^(.+)\..+$' --replace '$1')" ]] then
			tit="$(echo "$tit" | rg '^(.+)\s+\[[a-zA-Z0-9_-]{11}\]$' --replace '$1')"
			echo -n "{\"title\": \"$tit\",\"url\": \"videos/$vid\",\"thumbnail\": \"videos/$img\"}," >> vidlist.json
		else
			echo -e "\x1b[38;5;196mfailed @{\n\tvid: $vid\n\timg: $img\n}"
			exit 2
		fi
	)

	sed -i 's/,$/]/' vidlist.json


# verify the generated json file
	jq '.[] | "\(.url) \(.title) \(.thumbnail)"' >/dev/null 2>&1 vidlist.json || exit 3
