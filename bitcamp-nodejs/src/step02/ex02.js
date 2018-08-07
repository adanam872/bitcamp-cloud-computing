// database 프로그래밍 select 실행

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

con.query('select * from pms2_member', function(err, results) {
    if (err) throw err;
    
    console.log("result");
});

con.end(function(err) {
    if (err) throw err;
    console.log('connection end');
}); 

console.log("select");