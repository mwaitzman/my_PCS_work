@echo off
IF "%1"=="" GOTO HELP

REM => copy .net core project file into temp folder
mkdir _temp 2>NUL
echo ^<Project Sdk="Microsoft.NET.Sdk.Web"^>^<PropertyGroup^>^<TargetFramework^>netcoreapp5.0^</TargetFramework^>^</PropertyGroup^>^</Project^> > _temp\p.csproj
copy %1 _temp 1>NUL
cd _temp

Setlocal EnableDelayedExpansion
for %%a in (%*) do set subject=!subject! %%a
echo %subject%

dotnet run -- %subject%

:RM 
REM => clean-up
cd ..
rmdir /Q /S _temp 1>NUL
GOTO EXIT

:HELP
echo Runs any C# file with a static Main() directly
echo Usage: %0 <file.cs> [args]

:EXIT