


/*

simple-nativemessage/example/nmhost.js

26-09-22


*/

        
        process.addListener('uncaughtException',err=>{
        
              send(err.toString());
              
        });
  
        
        
        function rec(json){
                                                              debug('rec',JSON.stringify(json,null,4));
              switch(json.type){
              

                case 'hello'    : send('world');              break;
                
                case 'launch'   : launch(json);               break;

                
              }//switch
        
        }//rec



        
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
              var cwd     = 'c:\\work\\selfedits.dev.internetservicesltd.co.uk\\www\\servers\\simple-server\\v1.2\\';
              
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





        
//---   simple-nativemessaging-v1.0


        var df        = true;
                                                                          debug('simple-nativemessaging v1.0');
                                                                          debug('process : ',process.pid);
        var buffer    = Buffer.alloc(0);
        
        process.stdin.on('readable',readable);
        process.stdin.on('end',onend);
              
        
        function send(json){
        
              var str     = JSON.stringify(json);
              var buf     = Buffer.from(str);
          
              var hdr     = Buffer.alloc(4);
              var len     = buf.length;
              hdr.writeUInt32LE(len,0);
          
              var data    = Buffer.concat([hdr,buf]);
              process.stdout.write(data);
              
        }//send


  //:
  
        function readable(){
        
              var input   = [buffer];
              
              do{
                    
                    var chunk   = process.stdin.read();
                    if(chunk)input.push(chunk);
                    
              }while(chunk);
              
              
              buffer        = Buffer.concat(input);
              
              if(buffer.length<4)return;
          
              var msglen    = buffer.readUInt32LE(0);
              var datalen   = msglen+4;
          
              if(buffer.length<datalen)return;

              
              var data      = buffer.slice(4,datalen);
              var str       = data.toString();
                                                                            //currently can only send objects from extension
                                                                            //
              var json      = JSON.parse(str);
              
              buffer        = buffer.slice(datalen);
              
              rec(json);
                                  
        }//readable

        function onend(){        
                                                                            debug('stdin closed - host disconnected');              
        }//onend
                

  //:        
        
        function debug(str){
        
              if(!df)return;
              var str   = Array.prototype.join.call(arguments,' ')+'\n';              
              process.stderr.write(str);
              
        }//debug









