
:: uninstall native messaging host
:: run as admin

:: 27-09-22


@echo off

:: !!! no spaces around = or at the end of line

SET name=simple_nativemessage_example


REG DELETE "HKCU\Software\Google\Chrome\NativeMessagingHosts\%name%" /f
REG DELETE "HKLM\Software\Google\Chrome\NativeMessagingHosts\%name%" /f


