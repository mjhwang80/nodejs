var http = require("http");

//호출 페이지 설정 
var options = {
    host : "127.0.0.1",
    port : 8000,
    path : "/"
}

var req = http.request(options, (res) => {
    var data = "";

    res.on("data", (chunk) => {
        data += chunk; //서버가 보내는 데이터 수신
    });

    res.on("end", () => { //수신 완료후 로그 출력 
        console.log(data);
    });

});

//명시적 완료 
req.end();