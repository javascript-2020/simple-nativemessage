

;
(function(){

  var obj           = {};
  module.exports    = obj;

        obj.rec         = {};
        obj.end         = null;
        
        var autoinit    = true;

        
        var buffer      = Buffer.alloc(0);
        var mem         = [];


        var stdin       = {};
        
        
        if(autoinit)setTimeout(init,50);

        
  //:
  
  
        obj.init=function(){return init()}    //d
        
        function init(){
                                                              //debug('simple-nativemessaging');
                                                              
              process.stdin.on('readable',stdin.readable);
              process.stdin.on('end',stdin.end);

        }//init
              

        obj.destroy=function(){return destroy()}   //d
        
        function destroy(){
        
              process.stdin.removeListener('readable',stdin.readable);
              process.stdin.removeListener('end',stdin.end);
              
              mem   = null;
              
        }//destroy

        
  //:

  
        obj.rec.add=function(callback){   //d
        
              mem.push(callback);
              
        }//add

        
        obj.rec.rem=function(callback){   //d
        
              for(var i=0;i<mem.length;i++){
              
                    if(mem[i]===callback){
                          mem.splice(i,1);
                          return;
                    }
                    
              }//for
              
        }//rem
        

  //:        

        
        function rec(json){              
                                                          //debug('rec',JSON.stringify(json,null,4));              

              if(typeof obj.rec==='function'){
                    obj.rec(json);
                    return;
              }


              var type    = Object.prototype.toString.call(obj.rec);
              
              if(type==='[object Object]'){              
              
                    for(var i=0;i<mem.length;i++){
                    
                          var fn    = mem[i];
                          fn(json);
                          
                    }//for
                    
                    return;
              }

        
        }//rec


        obj.send=function(json){return send(json)}    //d
        
        function send(json){
        
              var str       = JSON.stringify(json);
              var data      = Buffer.from(str);
          
              var header    = Buffer.alloc(4);
              var len       = data.length;
              header.writeUInt32LE(len,0);
          
              var buffer    = Buffer.concat([header,data]);
              process.stdout.write(buffer);
              
        }//send


  //:

  
        stdin.end=function(){
                                                              //debug('stdin closed');
              if(typeof obj.end==='function'){
                    obj.end();
              }
              
        }//stdinend

        
        stdin.readable=function(){
        
              var input   = [buffer];
              
              do{
                    
                    var chunk   = process.stdin.read();
                    if(chunk)input.push(chunk);
                    
              }while(chunk);

              
              buffer    = Buffer.concat(input);
          
              if(buffer.length<4)return;
              
              var len   = buffer.readUInt32LE(0);
              var end   = len+4;
          
              if(buffer.length<end)return;

              
              var data    = buffer.slice(4,end);
              buffer      = buffer.slice(end);

              var str     = data.toString();
              var json    = JSON.parse(str);
              
              rec(json);
                                  
        }//readable


  //:        

      
        obj.debug=function(){return debug.apply(null,arguments)}   //d
        
        function debug(str0){
              
              //if(!obj.df)return;
              
              var str   = Array.prototype.join.call(arguments,' ');
              str      += '\n';              
              process.stderr.write(str);
              
        }//debug


//simple-nativemessage-v2.0:d-

})()
;




