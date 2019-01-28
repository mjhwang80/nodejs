const mysql = require("mysql");
const conn = {
    host : "localhost"
    ,user : "micro"
    ,password : "servie"
    ,database : "monilithic"
}

var connection = mysql.createConnection(conn);
connection.connect();

connection.query("insert into member(username, userid) values (2, 2);"
    , (error, results, field) => {
        if(error){
            console.log(error);
        }

        //select, list일 경우 
        //result[0].username 등으로 접근 
    });

connection.end();
