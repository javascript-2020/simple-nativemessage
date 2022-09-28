


//---   simple-nativemessaging-v1.0

        var df        = true;
                                                                          debug('simple-nativemessaging - v1.0');
                                                                          debug('process : ',process.pid);
        var buffer    = Buffer.alloc(0);
        
        process.stdin.on('readable',readable);
        process.stdin.on('end',onend);
              
        
        function rec(json){
                                                                          debug('--- rec ---\n',JSON.stringify(json,null,4),'\n---');
                                                        
        }//rec

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



