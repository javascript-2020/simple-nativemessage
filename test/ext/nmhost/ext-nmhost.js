


/*

simple-nativemessage/test/ext/ext-nmhost.js:d

27-09-22


*/
                                                                    console.log('ext-nmhost.js');
        var application   = 'simple_nativemessage_example';

        
        chrome.runtime.onMessage.addListener(msg);
        chrome.runtime.onMessageExternal.addListener(ext);

        
        function msg(message,sender,callback){
                                                                    console.log('msg',message);
              send(message,callback);
              return true;
              
        }//onmsg
        
        function ext(message,sender,callback){
                                                                    console.log('ext',message);
              send(message,callback);
              return true;
              
        }//onmsg
          
  
        function send(message,callback){
                                                                    console.log('send',application,message);                                                                    
              chrome.runtime.sendNativeMessage(application,message,complete);
              
              function complete(result){
                                                                    console.log('complete',result);
                    callback(result);
                    
              }//complete
              
        }//send


        
        