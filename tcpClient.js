var net = require("net");

//1. 접소 정보
var options = {
     host : "127.0.0.1"
    ,port : 9000
}

//2. 서버 접속
var client = net.connect(options, () => {
    console.log("connected");
});

//3. 데이터 수신 이벤트
client.on("data", (data) => {
    console.log(data.toString());
});

//4. 접속 종료 이벤트 
client.on("end", () => {
    console.log("disconnected");
});