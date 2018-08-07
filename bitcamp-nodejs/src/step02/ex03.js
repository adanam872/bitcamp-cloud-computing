// database 프로그래밍 db 연결하기

const mysql = require('mysql');

// 1) DBMS와 연결을 수행할 객체를 준비한다.
var con = mysql.createConnection({
    host: '13.125.145.195', // 호스트가 localhost이면 생략가능
    port: '3306', // 포트번호가 3306이면 생략가능
    database: 'studydb',
    user: 'study',
    password: '1111'
});

// 2) 연결 객체를 통해 DBMS와 연결한다.
// => connect(연결완료 후 호출될 함수);
con.connect(function(err) {
    // 만약 연결에 실패했다면 err 파라미터 값이 존재할 것이다.
    if (err) {
        throw err; // 예외를 던져 오류 있음을 알려라
    }
    
    console.log("connection success");
});

// 3) DBMS와의 연결 해제를 예약한다
// => 즉 다음 코드를 실행하는 것은 연결된 con객체가 SQL 작업을 실행하지 않느다면 
//    서버와의 연결을 끊으라고 예약하는 것이다.
con.end(function(err) {
    if (err) throw err;
    console.log('connection end');
}); // 지금당장 연결을 끊으라는 것이 아니다.

console.log("connection test");