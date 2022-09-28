# simple-nativemessaging

this is a nodejs script, to be used as a native message host for web browser extensions

the min version is designed to be as simple as possible to highlight the concepts

v1.0 is as a simple copy and paste solution
v2.0 used with npm i simple-nativemessage


see the test directory for complete working examples




# chrome extension

the extension is currently built for chrome based browsers on windows

download the repository https://github.com/javascript-2020/simple-nativemessage

open *chrome://extensions*
in the top right, switch to developer mode
click load unpacked
navigate to *test/ext* and select folder
copy the extension id
paste the extension id into allow_origins value in *test/ext/nmhost/nmhost-manifest.json*
if using externall connectable ( see below ) paste the extension id into *test/webpage/index.html*
run *ext/nmhost/install-nmhost.bat* as administrator

to use the externally connectable extension interface, the webpage must be served from
at least a second level domain, for local servers this means editing the hosts file
the extension is designed to allow externallyconnectable from http://site.localhost/*
so the host file will need the entry

*c:/Windows/System32/drivers/etc/hosts*
*/etc/hosts*

127.0.0.1   site.localhost

alternatively communication with the extension/native message host can be achieved using 
the content script *test/ext/content-script/content-script.js*

open a cmd prompt
navigate to *test/webpage*
run the server `node server`

open chrome based browser at http://localhost:8081
or if using externally connectable http://site.localhost:8081

https://developer.chrome.com/docs/extensions/mv3/manifest/externally_connectable/
