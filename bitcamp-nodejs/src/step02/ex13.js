// database 프로그래밍 insert 실행 후 auto_increment PK 컬럼 값 알아내기

const mysql = require('mysql');

var con = mysql.createConnection({
    host: '13.125.145.195', 
    port: '3306',
    database: 'studydb',
    user: 'study',
    password: '1111'
});

con.connect(function(err) {
    if (err) throw err;     
    console.log("connection success");
});

var title = "this is title";
var content = "this is contents";

con.query(`insert into pms2_board(titl,cont,cdt) values(?, ?, now())`,[title, content] , function(err, result) {
    if (err) throw err;    
    console.log(result);
});

con.end(function(err) {
    if (err) throw err;
    console.log('connection end');
}); 



console.log("insert");