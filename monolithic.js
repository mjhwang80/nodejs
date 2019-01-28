const http = require("http");
const url = require("url");
const querystring = require("querystring");

var server = http.createServer((request, response) => {
    var method = request.method;
    var uri = url.parse(request.url, true);
    var pathname = uri.pathname;

    //POST, PUT이면 데이터를 읽음
    if(method == "POST" || method == "PUT"){
        var body = "";

        request.on("data", function(data){
            body += data;
        });

        request.on("end", function(){
            var params;

            //header 정보가 json이면 처리
            if(request.headers['content-type'] == "application/json"){
                params = JSON.parse(body);
            }else{
                params = querystring.parse(body);
            }

            onRequest(response, method, pathname, params);
        });
    }else{
        //GET과 DELETE면 query 정보를 읽음 
        onRequest(response, method, pathname, uri.query);
    }
}).listen(8000);

function onRequest(res, mehtod, pathname, params){

    switch(pathname){
        case "/members" :
            //todo
            break
        default:
            res.writeHead(404);
            return res.end();

    }
    res.end("response!");
}

function response(res, packet){
    res.writeHead(200, {"Content-Type" : "application/json"});
    res.end(JSON.stringify(packet));
}