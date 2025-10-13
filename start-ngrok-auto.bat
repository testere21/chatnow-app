@echo off
:start
echo Starting ngrok with auto-update...
node ngrok-auto-update.js
echo Ngrok stopped, restarting in 5 seconds...
timeout /t 5 /nobreak > nul
goto start

