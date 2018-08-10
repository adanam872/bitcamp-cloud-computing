// 주제 : /member/* 요청을 처리할 라우터 만들기

const express = require('express');
const router = express.Router();

router.get('/list', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/plan;charset=UTF-8'
    });
    res.write('회원 목록입니다.');
    res.end();
});

router.get('/view', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/plan;charset=UTF-8'
    });
    res.write('회원정보입니다.');
    res.end();
});

module.exports = router;