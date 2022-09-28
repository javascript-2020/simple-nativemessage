


/*

c:/Windows/System32/drivers/etc/hosts
/etc/hosts

*/
                                                                        console.log('simple-nativemessage example server';
                                                                        console.log();
                                                                        console.log('simple-nativemessage/test/webpage/server.js');
                                                                        console.log('process : ',process.pid);
                                                                        console.log();
                                                                        
        var port      = 8081;
        
        var http      = require('http');
        var server    = http.createServer(request);
        server.listen(port);
        
        function request(req,res){
                                                                        console.log(200,req.url);
              var fs      = require('fs');
              var html    = fs.readFileSync('index.html');
              res.setHeader('content-type','text/html');
              res.end(html);
              
        }//request
        
        