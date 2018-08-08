// database 프로그래밍 delete

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

var mid = "user002";

con.query(`delete from pms2_member where mid='${mid}'`, function(err, result) {
    if (err) throw err;    
    console.log(result);
});

con.end(function(err) {
    if (err) throw err;
    console.log('connection end');
}); 



console.log("insert");