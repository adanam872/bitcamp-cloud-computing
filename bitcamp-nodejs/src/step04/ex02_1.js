// 주제 : express 사용하기 - get/post parameter 처리

// 모듈준비
const express = require('express');

// 웹서버 객체 준비
const app = express();

// post 요청 데이터를 처리할 모듈 로딩
const bodyParser = require('body-parser');

// post 요청 데이터를 분석할 객체를 준비한다.
const postParameterParser = bodyParser.urlencoded({extended: false});

// post 요청 파라미터 분석기를 Express 웹서버 객체에 등록한다.
app.use(postParameterParser);

// URL에 대해 함수를 연결한다
app.get('/test01', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/plan;charset=UTF-8'
    });
    res.write(`name=${req.query.name}\n`);
    res.write(`age=${req.query.age}\n`);
});

app.post('/test02', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/plan;charset=UTF-8'
    });
    res.write(`name=${req.body.name}\n`);
    res.write(`age=${req.body.age}\n`);
    res.end();
});

// 서버 실행하기
app.listen(8000, () => {
    console.log("server on");
});