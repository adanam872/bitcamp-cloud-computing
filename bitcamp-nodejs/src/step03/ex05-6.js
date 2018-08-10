// 주제 : express 사용하기

const mysql = require('mysql');
const express = require('express');

var pool = mysql.createPool({
    connectionLimit: 10,
    host: '13.125.145.195', 
    port: '3306',
    database: 'studydb',
    user: 'study',
    password: '1111'
});

const app = express();

app.get('/member/list', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/plan;charset=UTF-8'
    });
    var pageNo = 1;
    var pageSize = 3;
    if (req.query.pageNo) {
        pageNo = parseInt(req.query.pageNo);
    }
    if (req.query.pageSize) {
        pageSize = parseInt(req.query.pageSize); 
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

app.get('/member/add', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/plan;charset=UTF-8'
    });
    var mid = req.query.mid;
    var email = req.query.email;
    var pwd = req.query.pwd;
    pool.query('insert into pms2_member(email,mid,pwd) values(?, ?, password(?))', [email, mid, pwd], function(err, result) {
        if (err) {
            res.end(err);
            return;
        }
        res.write("등록완료");
        res.end();
    });
});

app.get('/member/update', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/plan;charset=UTF-8'
    });
    var email = req.query.email;
    var mid = req.query.mid;
    pool.query('update pms2_member set email = ? where mid=?', [email, mid], function(err, results) {
        if (err) {
            res.end(err);
            return;
        }
        res.write('수정 완료');
        res.end();
    });
});

app.get('/member/delete', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/plan;charset=UTF-8'
    });
    var mid = req.query.mid;
    pool.query('delete from pms2_member where mid=?', [mid], function(err, result) {
        if (err) {
            res.end(err);
            return;
        }
        res.write("삭제완료");
        res.end();
    });
});

app.listen(8000, ()=> {
    console.log('서버 실행중...');
});