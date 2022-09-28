


/*

simple-nativemessage/test/ext/content-script.js

27-09-22


*/


;
(function(){
                                                                    console.log('simple-nativemessage/test/ext/content-script/content-script.js');


        if(document.title!=='simple-nativemessage-test'){
                                                                    console.log('exit',document.title);
              return;
        }
        
                                                                    log('content-script.js');

        var btn        = document.getElementById('btn2');
        btn.onclick    = e=>{
                                                                    log('hello');
              send({type:'hello'});
        };
        
        var btn         = document.getElementById('calc2');
        btn.onclick     = e=>{
                                                                    log('launch calc');
              send({type:'launch',name:'calc'});
              
        };

        var btn         = document.getElementById('elevated2');
        btn.onclick     = e=>{
                                                                    log('launch elevated');
              send({type:'launch',name:'elevated'});
              
        };
        
        
        function send(message){

              chrome.runtime.sendMessage(message,complete);
              
              function complete(response){
                                                                    log(response);
              }//complete
              
        }//contentscript
        
        
        function log(){
        
              var str       = Array.prototype.join.call(arguments,' ');
              
              console.log('cs',str);
              
              var output    = document.getElementById('output');
              str          += '\n';
              var tn        = document.createTextNode(str);
              output.appendChild(tn);
              
        }//log
        
        
})()
;




        