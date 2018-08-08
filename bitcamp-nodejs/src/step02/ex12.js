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

pool.query('select * from pms2_member', function(err, results) {
        if (err) throw err;    
        for (var row of results) {
            console.log(row.email, row.mid, row.pwd);
        }
    });

console.log("select");

// ex11 sql을 실행할 때 마다 매번 커넥션을 얻어야 하기 때문에 ex12.js 보다는 코드가 복잡하다.
// 그러나 한 번 커넥션을 얻으면 여러번 사용할 수 있기 때문에 여러개의 질의를 해야 할 경우 유리