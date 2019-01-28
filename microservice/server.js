'use strict'

const net = require("net");
const tcpClient = require("./client.js");

class tcpServer {
    constructor(name, port, urls){
        this.context = {
            port : port,
            name: name,
            urls: urls
        }

        this.merge = {};

        this.server = net.createServer((socket) => {
            //클라이언트 접속 이벤트
            this.onCreate(socket);

            socket.on('error', (exception) => {
                this.onClose();
            });

            socket.on('close', () => {
                this.onClose(socket);
            });

            socket.on('data', (data) => {
                var key = socket.remoteAddress + ":" + socket.remotePort;
                var sz = this.merge[key] ? this.merge[key] + data.toString() : data.toString();
                var arr = sz.split("§");
                for(var n in arr){
                    if(sz.charAt(sz.length - 1) != '§' && n == arr.length -1){
                        this.merge[key] = arr[n];
                        break;
                    }else if(arr[n] == ""){
                        break;
                    }else{
                        this.onRead(socket, JSON.parse(arr[n]));
                    }
                }
            });
        });

        this.server.on('error', (err) => {
            console.log(err);
        });

        this.server.listen(port, () =>{
            console.log("listen", this.server.address());
        });
    }

    onCreate(scoket) {
        console.log("onCreate", socket.remoteAddress, socket.remotePort);
    }

    onColse(scoket){
        console.log("onClose", socket.remoteAddress, socket.remotePort);
    }

    connectToDistrubutor(host, port, onNoti){
        var packet = {
             uri: "/distributes"
            ,mothod : "POST"
            ,key: 0
            ,params: this.context
        };

        var  isConnectedDistributor = false;

        this.clientDistributor = new tcpClient(
             host
            ,port
            ,(options) => {                                 //Distributor 접속 이벤트
                isConnectedDistributor = true;
                this.clientDistributor.write(packet);
            }
            ,(options, data) => {onNoti(data); }            //데이서 수신 이벤트
            ,(options) => {isConnectedDistributor = false;} //접속 종료
            ,(options) => {isConnectedDistributor = false;} //통신 에러
        );

        //주기적으로 재접속 시도
        setInterval(()=>{
            if(!isConnectedDistributor){
                this.clientDistributor.connect();
            }
        }, 3000);
    }
}
module.exports = tcpServer;