#!/bin/bash

function help() {
	echo 'Runs any C# file with a static Main() directly;'
	echo 'Usage: $0 <file.cs> [args]';
	return 1
}


if [ "$#" -lt 1]
then
	help
fi

# copy .net core project file into temp folder
mkdir _temp 2>NUL
echo '^<Project Sdk="Microsoft.NET.Sdk.Web"^>^<PropertyGroup^>^<TargetFramework^>netcoreapp5.0^</TargetFramework^>^</PropertyGroup^>^</Project^>' > _temp\p.csproj
copy $1 _temp 1>NUL
cd _temp

dotnet run -- $*


## clean-up
cd ..
rm -r /Q /S _temp 1>NUL
exit 0;
