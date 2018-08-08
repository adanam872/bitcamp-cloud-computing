// database 프로그래밍 connection pool 사용 I

const mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit: 10,
    host: '13.125.145.195', 
    port: '3306',
    database: 'studydb',
    user: 'study',
    password: '1111'
});

pool.getConnection(function(err, con) {
    if (err) throw err;     
    console.log("connection...");
    
    // 연결에 성공 했을 때만 SQL을 실행하라고 예약한다.
    con.query('select * from pms2_member', function(err, results) {
        if (err) throw err;    
        for (var row of results) {
            console.log(row.email, row.mid, row.pwd);
        }
    });
    
    // end()를 밖으로 빼면 end()가 먼저 실행된다.
    con.release();
    
    pool.end(function(err) {
        console.log("end");
    });
    
    // 프로그램을 종료하고 싶다면 작업이 끝난 후 커넥션 풀의 모든 커넥션을 닫아야 한다.
    // 보통 서버로 실행하다가 종료할 때 커넥션 풀을 닫는다.
    // 커넥션 풀을 닫지 않으면 Node.js가 종료되지 않는다.
    
    // 물론 서버로 실행할 때는 당연히 그래야 하지만,
    // 이 프로그램 예제처럼 그냥 간단히 사용하고 종료하고 싶다면
    
    // 질의를 완료한 후에 커넥션 풀을 닫아라.
});


console.log("select");