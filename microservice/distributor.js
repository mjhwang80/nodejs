'use strict'

var map = {}

class distributor extends require("./server.js") {
    constructor(){
        super("distributor", 9000, ["POST/distributes", "GET/distributes"]);
    }

    //접속 노트 이벤트 처리
    onCreate(socket){
        console.log("onCreate", socket.remoteAddress, socket.remotePort);
        this.sendInfo(socket);
    }

    onClose(socket){
        var key = socket.remoteAddress + ":" + socket.remoteport;
        console.log("onClose", socket.remoteAddress , socket.remoteport);
        
        delete map[key];
        this.sendInfo();
    }

    onRead(socket, json){
        var key = socket.remoteAddress + ":" + socket.remoteport;
        console.log("onRead", socket.remoteAddress , socket.remoteport);

        if(json.uri == "/distributes" && json.method == "POST"){
            map[key] = {
                socket : socket
            };

            map[key].info = json.params;
            map[key].info.host = socket.remoteAddress;
            this.sendInfo();
        }

    }

    write(socket, packet){
        socket.write(JSON.stringify(packet) + "§");
    }

    sendInfo(scoket){
        var packet = {
            uri: "/distributes"
            ,method: "GET"
            ,key: 0
            ,params: []
        };

        for(var n in map){
            packet.params.push(map[n].info);
        }

        if(scoket){
            this.write(scoket, packet);
        }else{
            for(var n in map){
                this.write(map[n].socket, packet);
            }
        }
    }
}

new distributor();