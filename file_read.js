var fs = require("fs"); //파일 시스템 모듈 사용

fs.readFile('home.js', 'utf-8', function(error, data){
    console.log("01 readAsync : %s", data);
});


var data = fs.readFileSync("home.js", "utf-8");

console.log("01 readAsync : %s", data);

