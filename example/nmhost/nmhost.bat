@echo off

set LOG="log.txt"

time /t >> %LOG%

node nmhost.js %* 2>> %LOG%

echo "exit code : %errorlevel%" >> %LOG%

