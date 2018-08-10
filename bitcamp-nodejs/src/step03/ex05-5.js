// 주제 : 코드를 모듈로 분리 - 요청 핸들러를 호출하는 코드 분리

const mysql = require('mysql');
const express = require('./express02');

var pool = mysql.createPool({
    connectionLimit: 10,
    host: '13.125.145.195', 
    port: '3306',
    database: 'studydb',
    user: 'study',
    password: '1111'
});

const app = express();

app.add('/member/list', (urlInfo, req, res) => {
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

app.add('/member/add', (urlInfo, req, res) => {
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

app.add('/member/update', (urlInfo, req, res) => {
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

app.add('/member/delete', (urlInfo, req, res) => {
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

app.listen(8000, ()=> {
    console.log('서버 실행중...');
});