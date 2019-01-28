const http = require('http');
const url = require("url");
const querystring = require("querystring");

var server = http.createServer((req, res) => { //HTTP 서버 생성
    var method = req.method;
    var uri = url.parse(req.url, true);
    var pathname = uri.pathname;

    if(mehtod === "POST" || mehtod === "PUT"){ //POST, PUT 메서드 처리
        var body = "";

        req.on('data', function(data){
            body += data;
        });
        
        req.on("end", () => {
            var params;
            //헤더가 application/json일 때는 JSON으로 파싱
            if(req.headers['content-type'] == 'application/json'){
                params = JSON.parse(body);
            }else{
                //header가 JSON이 아니면 querystring으로 파싱
                params = querystring.parse(body);
            }

            onRequest(res, method, pathname, params);
        });    
    }else{
        onRequest(res, method, pathname, uri.query);
    }
}).listen(8000, () => {
    console.log("listen", server.address);
});

//요청 정보 처리
function onRequest(res, method, pathname, params){

}