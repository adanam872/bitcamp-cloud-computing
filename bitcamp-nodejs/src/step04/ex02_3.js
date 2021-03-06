// 주제 : express 사용하기 - 템플릿 엔진 지정하기

const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));

// 정적 HTML 파일 처리
app.use(express.static('public'));

// 통합 템플릿 엔진 관리자 모듈 로딩
const consolidate = require('consolidate');

// express에 엔진을 등록한다
app.engine('html', consolidate.handlebars);

app.set('view engine', 'html');

// 등록된 템플릿 엔진 중에 사용할 엔진을 지정한다.
app.set('views', path.join(__dirname, 'templates'));

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

app.get('/test03', (req, res) => {
    res.render('template01', req.query);
});

app.listen(8000, () => {
    console.log("server on");
});