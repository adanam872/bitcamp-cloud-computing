// 주제 : SQL 각 요청을 함수로 분리하기

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
    
    if (urlInfo.pathname === '/member/list') {        
        list(urlInfo, req, res);
    } else if (urlInfo.pathname === '/member/add') {
        add(urlInfo, req, res);
    } else if (urlInfo.pathname === '/member/update') {
        update(urlInfo, req, res);
    } else if (urlInfo.pathname === '/member/delete') {
        remove(urlInfo, req, res);
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

function list(urlInfo, req, res) {
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
}

function add(urlInfo, req, res) {
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
}

function update(urlInfo, req, res) {
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
}

function remove(urlInfo, req, res) {
    var mid = urlInfo.query.mid;
    pool.query('delete from pms2_member where mid=?', [mid], function(err, result) {
        if (err) {
            res.end(err);
            return;
        }
        res.write("삭제완료");
        res.end();
    });
}