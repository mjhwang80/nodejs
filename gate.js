const http = require('http');
const url = require("url");
const querystring = require("querystring");

var server = http.createServer((req, res) => {
    var method = req.method;
    var uri = url.parse(req.url, true);
    var pathname = uri.pathname;

    if(mehtod === "POST" || mehtod === "PUT"){
        var body = "";

        req.on('data', function(data){
            body += data;
        });

        req.on("end", funciton(){
            var parmas;

            if(req.headers['content-type'] == "application/json"){

            }
        });
    }else{

    }
});