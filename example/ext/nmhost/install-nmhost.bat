
:: install native messaging host
:: run as admin

:: 27-09-22

@echo off


:: !!! no spaces around = or at the end of line

SET name=simple_nativemessage_example

SET file=nmhost-manifest.json


:: Change HKLM to HKCU if you want to install locally

REG ADD "HKLM\Software\Google\Chrome\NativeMessagingHosts\%name%" /ve /t REG_SZ /d "%~dp0%file%" /f


