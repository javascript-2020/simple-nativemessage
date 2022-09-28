


/*

simple-nativemessage/example/nmhost/nmhost-v2.0.js

26-09-22


*/

        var nmhost    = require('../../v2.0/simple-nativemessage-v2.0.js');
        var debug     = nmhost.debug;
        
        nmhost.rec    = rec;



        
        process.addListener('uncaughtException',err=>{
        
              send(err.toString());
              
        });
  
        
        function rec(json){
              
                                                              debug('myrec',JSON.stringify(json,null,4));
              switch(json.type){
              

                case 'hello'    : nmhost.send('world');       break;

                
                case 'launch'   : launch(json);               break;

                
              }//switch

        
        }//rec
        
        function send(json){
        
              nmhost.send(json);
              
        }//send



        
        var child_process   = require('node:child_process');

        
        function launch(json){

              switch(json.name){
              
                case 'calc'             : launch.calc();            break;
                case 'elevated'         : launch.elevated();        break;
                
                case 'simple-server'    : launch.simpleserver();    break;
                
              }//switch
              
        }//launch

        
        launch.calc=function(){
                                                      debug('launch.calc');
              var cmd   = 'calc';
              launch.process(cmd);
              
        }//launch.calc
        
        launch.simpleserver=function(){        
                                                                        debug('launch.simpleserver');
        
              var cmd     = 'simple-server';
              var cwd     = 'c:\\wwebsites\\example\\www\\';
              
              launch.process(cmd,cwd);
              
        }//simpleserver


        launch.process=function(cmd,cwd){
        
              var args    = [];
              
              var opts    = {
                    cwd         : cwd,
                    detached    : true,
                    stdio       : 'ignore'
              };
              
              var process   = child_process.spawn(cmd,args,opts);
              var pid       = process.pid;
              process.unref();
                                                                          debug('process',pid);
              send('ok, process : '+pid);
        
        }//process

        
        launch.elevated=function(){
                                                                          debug('elevated');

              var cmd   = 'calc';
              var cwd;
              
              cmd       = 'start-process '+cmd+' -verb runas';
              
              var opts    = {
                    cwd         : cwd,
                    shell       : 'powershell.exe',
                    detached    : true,
                    stdio       : 'ignore'

              };

              var process       = child_process.exec(cmd,opts);
              process.unref();
              
              var pid       = process.pid;
                                                                          debug('process',pid);                                                                      
              send('ok pid : '+pid);
              
        }//elevated




