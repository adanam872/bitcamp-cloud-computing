// 주제 : 코드를 모듈로 분리 - 요청 핸들러를 관리하는 코드 분리
// 요청핸들러(요청이 왔을 때 호출되는 함수)를 좀 더 관리하기 쉽게 등록을 자동화 한다.

const http = require('http');
const url = require('url');
const mysql = require('mysql');
const express = require('./express01');

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
    
    var handler = express.getHandler(urlInfo.pathname);
    
    if (handler) {
        handler(urlInfo, req, res);
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

express.add('/member/list', (urlInfo, req, res) => {
    var pageNo = 1;
    var pageSize = 3;
    if (urlInfo.query.pageNo) {
        pageNo = parseInt(urlInfo.query.pageNo);
    }
    if (urlInfo.query.pageSize) {
        pageSize = parseInt(urlInfo.query.pageSize); 
    }
    var startIndex = (pageNo-1)*pageSize;
    
    pool.query('select mid, email from pms2_member limit ?, ?', [startIndex, pageSize], function(err, results) {
        if (err) {
            res.end(err);
            return;
        }
        for (var row of results) {
            res.write(row.email+" "+row.mid+"\n");
        }
        res.end();
    });
});

express.add('/member/add', (urlInfo, req, res) => {
    var mid = urlInfo.query.mid;
    var email = urlInfo.query.email;
    var pwd = urlInfo.query.pwd;
    pool.query('insert into pms2_member(email,mid,pwd) values(?, ?, password(?))', [email, mid, pwd], function(err, result) {
        if (err) {
            res.end(err);
            return;
        }
        res.write("등록완료");
        res.end();
    });
});

express.add('/member/update', (urlInfo, req, res) => {
    var email = urlInfo.query.email;
    var mid = urlInfo.query.mid;
    pool.query('update pms2_member set email = ? where mid=?', [email, mid], function(err, results) {
        if (err) {
            res.end(err);
            return;
        }
        res.write('수정 완료');
        res.end();
    });
});

express.add('/member/delete', (urlInfo, req, res) => {
    var mid = urlInfo.query.mid;
    pool.query('delete from pms2_member where mid=?', [mid], function(err, result) {
        if (err) {
            res.end(err);
            return;
        }
        res.write("삭제완료");
        res.end();
    });
});