var  fs = require("fs");

var data = "My first data... \r\n hello there!";


fs.writeFile("file01_async.txt", data, 'utf-8', function(e){
    if(e){
        console.log(e);
    }else{
        console.log("01 WRITE DONE!");
    }
});


//동기방식은 callback 함수를 통한 오류처리를 할 수 없기때문에 함수전체를 try 문으로 예외처리
try{
    fs.writeFileSync("file02_sync.txt", data, 'utf-8');
    console.log("01 WRITE DONE!");
}catch(e){
    console.log(e);
}