@echo off
:start
echo Starting ngrok...
ngrok http 3000 --log=stdout > ngrok.log 2>&1
echo Ngrok stopped, restarting in 5 seconds...
timeout /t 5 /nobreak > nul
goto start
