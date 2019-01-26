var http = require("http");
var queryString = require("querystring");

var server = http.createServer(function(request, response){
    var postdata = '';
   
    request.on('data', function(data){

        console.log(data);
        postdata = postdata + data;
    });

    request.on("end", function(){
        var parseQuery = queryString.parse(postdata);

        console.log(parseQuery);

        console.log("end");

        response.writeHead(200, {"Content-Type" : "text/html"});
        response.end("var1의 값 : " + postdata);
    });

    
});

server.listen(8080, function(){
    console.log("Server is running");
});

