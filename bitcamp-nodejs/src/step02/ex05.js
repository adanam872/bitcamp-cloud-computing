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
    
    // 연결에 성공 했을 때만 SQL을 실행하라고 예약한다.
    con.query('select * from pms2_member', function(err, results) {
        if (err) throw err;    
        for (var row of results) {
            console.log(row.email, row.mid, row.pwd);
        }
    });
    
    // end()를 밖으로 빼면 end()가 먼저 실행된다.
    con.end(function(err) {
        if (err) throw err;
        console.log('connection end');
    }); 
});



console.log("select");