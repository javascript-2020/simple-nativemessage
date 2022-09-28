# simple-nativemessaging

this is a nodejs script, to be used as a native message host for web browser extensions


v1.0  - a simple copy and paste solution, designed to be as simple as possible to highlight 
the concepts

v2.0  - used with npm i simple-nativemessage


see the example directory for working example



```

      var nmhost    = require('simple-nativemessage');
      
      nmhost.rec    = rec;
      var debug     = nmhost.debug;
      
      
      function rec(json){
      
            debug('rec',JSON.stringify(json,null,4));

                                    
            switch(json.type){
            
              case 'hello'      : nmhost.send('world');       break;
              
            }//switch

      }//rec

```



# chrome extension

## install

  the extension is currently built for chrome based browsers on windows
  
  download the repository to a convenient location - https://github.com/javascript-2020/simple-nativemessage
  
  open *chrome://extensions*
  
  in the top right, switch to developer mode
  
  click load unpacked
  
  navigate to ***example/ext*** and select folder
  
  copy the extension id
  
  paste the extension id into allow_origins value in ***example/ext/nmhost/nmhost-manifest.json***
  
  if using externally connectable ( see below ) paste the extension id into ***example/webpage/index.html***
  
  run ***example/ext/nmhost/install-nmhost.bat*** as administrator ( right-click 'Run as administrator' )
  
  this will create a registry key for the native messaging host, specifying the location of ***example/ext/nmhost/nmhost-manifest.json***
  
  
  to use the externally connectable extension interface, the webpage must be served from
  at least a second level domain, for local servers this means editing the hosts file
  the extension is designed to allow externally connectable from http://site.localhost/*
  so the host file will need the entry

*c:/Windows/System32/drivers/etc/hosts*

*/etc/hosts*

127.0.0.1   site.localhost

https://developer.chrome.com/docs/extensions/mv3/manifest/externally_connectable/



alternatively communication with the extension/native message host can be achieved using 
the content script ***example/ext/content-script/content-script.js***


open a cmd prompt
navigate to ***example/webpage***
run the server 

`node server`

open chrome based browser at http://localhost:8081

or if using externally connectable http://site.localhost:8081


## uninstall

open *chrome://extensions*

click remove

run ***example/ext/nmhost/uninstall-nmhost.bat***



