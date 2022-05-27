#!/bin/bash
if   [[ "$#" -eq 0 ]] || [[ "$#" -gt 2 ]]; then
        printf "\x1b[31mError: Expected \x1b[34m1-2\x1b[31m arguments, got \x1b[34m$#\x1b[31m. Aborting..."
else
    data="<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>$2</title>
    </head>
    <body>
        <hr>
        <a href=\"index.html\">back to the homepage</a>
    </body>
    </html>"

    echo "$data" > "$1.html"

    bat --paging=always "$1.html"
fi
