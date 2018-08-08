// 주제 : SQL 요청 처리하기 회원 삭제하기

const http = require('http');
const url = require('url');
const mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit: 10,
    host: '13.125.145.195', 
    port: '3306',
    database: 'studydb',
    user: 'study',
    password: '1111'
});

const server = http.createServer((req, res) => {
    var urlInfo = url.parse(req.url, true);
    
    if (urlInfo.pathname === '/favicon.ico') {
        res.end();
        return;
    }
    
    console.log('someons asks...');
   
    res.writeHead(200, {
        'Content-Type': 'text/plan;charset=UTF-8'
    });
    
    if (urlInfo.pathname === '/member/delete') {
        var mid = urlInfo.query.mid;
        pool.query('delete from pms2_member where mid=?', [mid], function(err, result) {
            if (err) {
                res.end(err);
                return;
            }
            res.write("삭제완료");
            res.end();
        });
    } else {
        res.end('지원불가');
        return;
    }
    
    // 비동기 query호출 했기 때문에 응답 완료하면 안된다.
    // res.end();
});

server.listen(8000, () => {
    console.log('server starts...');
});