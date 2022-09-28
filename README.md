# simple-nativemessage

this is a nodejs script, to be used for communicating between a browser extensions and a native message host


**v1.0**  - a simple copy and paste solution, designed to be as simple as possible to highlight 
the concepts

**v2.0**  - used with `npm i simple-nativemessage`

```

      var nmhost    = require('simple-nativemessage');
      var debug     = nmhost.debug;
      
      nmhost.rec    = rec;
      
      
      function rec(json){
      
            debug('rec',JSON.stringify(json,null,4));

                                    
            switch(json.type){
            
              case 'hello'      : nmhost.send('world');       break;
              
            }//switch

      }//rec

```





# example chrome extension

see the example directory for working example


## install

the extension is currently built for chrome based browsers on windows

<br>

### 1. download

download the repository to a convenient location - https://github.com/javascript-2020/simple-nativemessage

<br/>

### 2. install extension

open *chrome://extensions*

in the top right, switch to developer mode

click load unpacked

navigate to ***example/ext*** and select folder


<br/>

### 3. setup extension

find the extension named **simple-nativemessage example extension**

copy the extension id

paste the extension id into allow_origins value in ***example/ext/nmhost/nmhost-manifest.json***

if using externally connectable ( see below ) paste the extension id into ***example/webpage/index.html***


<br/>

### 4. setup native messaging

run ***example/ext/nmhost/install-nmhost.bat*** as administrator ( right-click 'Run as administrator' )

this will create a registry key for the native messaging host, under 

> HKLM\Software\Google\Chrome\NativeMessagingHosts\

specifying the location of ***example/ext/nmhost/nmhost-manifest.json***


<br/>

### 5. optional, extension connection from a webpage

to use the externally connectable extension interface, which allows a webpage to communicate directly with an extension,
the webpage must be served from at least a second level domain, for local servers this means 
creating a dns record -- ie editing the hosts file

https://developer.chrome.com/docs/extensions/mv3/manifest/externally_connectable/

the extension is designed to be externally connectable from 

> ht<span>tp://</span>site.localhost/*

so the host file will need the entry

> 127.0.0.1   site.localhost


*c:/Windows/System32/drivers/etc/hosts*

*/etc/hosts*


<br>

communication with the extension/native message host can always be achieved using 
the content script ***example/ext/content-script/content-script.js***


<br/>

### 6. start server

open a cmd prompt
navigate to ***example/webpage*** , run the server :

`node server.js`


<br/>

### 7. test native message

open chrome based browser at http://localhost:8081

or if using externally connectable http://site.localhost:8081

<br/>

> content-script.js

should be displayed, meaning the content script has been added to the page

<br>

clicking the test button under the content script, should print hello 

then returning from the native message host, should print world

native messaging is working

<br>

calculator launches the calculator app that comes with all versions of window

elevated launches the calculator with elevated permissions

launching applications like these is a common use for native messaging



## uninstall

### 1. remove extension

open *chrome://extensions*

find the extension named **simple-nativemessage example extension**

click remove


<br/>

### 2. remove native messaging

run ***example/ext/nmhost/uninstall-nmhost.bat*** as administrator ( right click 'Run as administrator' ) 

this will remove the previously created registry key








