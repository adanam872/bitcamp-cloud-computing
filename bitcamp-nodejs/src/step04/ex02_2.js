// 주제 : express 사용하기 - 정적 HTML 파일을 서비스하기

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));

// 정적 HTML 파일 처리
app.use(express.static('public'));

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

app.listen(8000, () => {
    console.log("server on");
});