var http = require("http");
var url = require('url');

var server = http.createServer(function(request, response){
    
    //1. 실제 요청한 주소전체를 콘솔에 출력
    console.log(request.url);
    
    var parseUrl = url.parse(request.url);
    var resource = parseUrl.pathname;

    console.log("resource path=%s", resource);

    if(resource == "/address"){
        response.writeHead(200, {"Content-Type": "text/html"});
        response.end("/address");
    }else{
        response.writeHead(404, {"Content-Type": "text/html"});
        response.end("404 Page Not Found");
    }


    

});


server.listen(8080, function(){
    console.log("Server is running....");
});