// database 프로그래밍 select 실행 III

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

var email = "user002@test.com";
var mid = "user002";
var pwd = "1111";

con.query(`insert into pms2_member(email,mid,pwd) values('${email}', '${mid}', password('${pwd}'))`, function(err, result) {
    if (err) throw err;    
    console.log(result);
});

con.end(function(err) {
    if (err) throw err;
    console.log('connection end');
}); 



console.log("insert");