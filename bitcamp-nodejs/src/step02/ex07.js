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

var mid = "user001";

con.query(`update pms2_member set email = 'user001@test.comxxx' where mid='${mid}'`, function(err, result) {
    if (err) throw err;    
    console.log(result);
});

con.end(function(err) {
    if (err) throw err;
    console.log('connection end');
}); 



console.log("insert");