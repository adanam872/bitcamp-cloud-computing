// 주제 : DAO 분리

const mysql = require('mysql');
const express = require('express');
const memberdao = require('./memberdao')
const app = express();

var pool = mysql.createPool({
    connectionLimit: 10,
    host: '13.125.145.195', 
    port: '3306',
    database: 'studydb',
    user: 'study',
    password: '1111'
});

memberdao.setConnectionPool(pool);

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
    memberdao.list(pageNo,pageSize, (err,results) => {
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
    memberdao.add(req.query,(err,result) => {
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
    memberdao.update(req.query, (err, result) => {
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
    memberdao.remove = (req.query, (err, result) => {
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