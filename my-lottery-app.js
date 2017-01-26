var sys = require('util'); 
var mysql=require('mysql'); 
var random = require("random");
var url = require("url"),
    fs = require("fs"),
    path = require("path");


console.log('正在连接MySQL...'); 
function randomCallback(integers){
	// Prints row 0, column 0
	console.log('randomCallback---------= ' + integers[0][0]);
}
var options = {
        secure: true, // Make the request secure
        num: 1,      // Get 10 integers
        min: 0,     // Minimum of -10
        max: 256,      // Maximum of 10
        col: 2,       // 2 columns
        base: 10,     // Use Base 16
        rnd: "id.123" // Which set of random numbers to use
    };

function errorCallback(type,code,string){
	console.log("RANDOM.ORG Error: Type: "+type+", Status Code: "+code+", Response Data: "+string);
}
random.generateIntegers(randomCallback,options,errorCallback);

var client = mysql.createConnection({'host':'localhost','port':3306,'user':'root','password':'2'}); 
var http = require("http"); 
var server=http.createServer(function(request, response) { 
  if (request.url == "/getusers") {
	 // response.writeHead(200, {"Content-Type": "text/html;charset:utf-8",'Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'});  
	 response.writeHead(200, {"Content-Type": "text/html;charset:utf-8"});  
	//  response.write("<!doctype html><html><meta charset='utf-8'/>"); 
	  clientConnectionReady = function(client) 
  { 
    client.query('use test', function(error, results) { 
      if(error) { 
        console.log('ClientConnectionReady Error: ' + error.message); 
        client.end(); 
        return; 
      }else{ 
    } 
      clientReady(client); 
    }); 
  }; 
     
  clientReady = function(client) { 
    getData(client); 
  } 
     
  getData = function(client) { 
    client.query( 
      'select * from sheet2', 
      function selectCb(error, results, fields) { 
        if (error) { 
          console.log('GetData Error: ' + error.message); 
          client.end(); 
          return; 
        }
		var strJson = JSON.stringify(results);
		console.log("---  "+strJson);
       	response.write(strJson);  
      response.end(); 
      } 
    ); 
    client.end(); 
      
  }; 
  	clientConnectionReady(client);
	return;
  }
	var pathname=__dirname+url.parse(request.url).pathname;
    if (path.extname(pathname)=="") {
        pathname+="/";
    }
    if (pathname.charAt(pathname.length-1)=="/"){
        pathname+="index.html";
    }

   pathname = decodeURI(pathname);
   fs.exists(pathname,function(exists){
   		 if(exists){
            switch(path.extname(pathname)){
                case ".html":
                    response.writeHead(200, {"Content-Type": "text/html;charset:utf-8"});
                    break;
                case ".js":
                    response.writeHead(200, {"Content-Type": "text/javascript;charset:utf-8"});
                    break;
                case ".css":
                    response.writeHead(200, {"Content-Type": "text/css;charset:utf-8"});
                    break;
                case ".gif":
                    response.writeHead(200, {"Content-Type": "image/gif"});
                    break;
                case ".jpg":
                    response.writeHead(200, {"Content-Type": "image/jpeg"});
                    break;
                case ".png":
                    response.writeHead(200, {"Content-Type": "image/png"});
                    break;
                default:
                    response.writeHead(200, {"Content-Type": "application/octet-stream"});
            }

            fs.readFile(pathname,function (err,data){
                response.end(data);
            });
        } else {
            response.writeHead(404, {"Content-Type": "text/html"});
            response.end("<h1>404 Not Found</h1>");
        }
    });
  
}); 
server.listen(8033,"127.0.0.1"); 
  
var sys = require("util"); 
sys.puts("Server running at http://localhost:8033/"); 
