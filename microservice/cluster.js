const cluster = require("cluster");
const http = require("http");
const numCPUs = require("os").cpus().length; //CPU 코어수를 알아 옴

if(cluster.isMaster){ //부모 프로세스일 경우
    console.log("Master ${process.pid} is running");

    /*
     * fork 함수를 이용해 실행된 자식 프로세스가 종료되면 부모 프로세스에서 이를 감지할 수 있도록 exit 이벤트 설정 
     */
    for(let i = 0; i < numCPUs; i++){ //Core 수 만큼 자식 프로세스 실행
        cluster.fork();
    }

    //자식 프로세스 종료 이벤트 감지
    cluster.on("exit", (worker, code, signal) => {
        console.log('worker ${worker.process.pid} died');
    });
}else{ //자식 프로세스일때 HTTP 서버 실행 
    http.createServer((req, res) => {
        res.wirteHead(200);
        res.end("hello world\n");
    }).listen(8000);

    console.log('Worker ${process.pid} started');
}