// 주제 : 템플릿 엔진 사용 - 외부 템플릿 파일 사용

const express = require('express');
const app = express();
const handlebars = require('handlebars');

// 외부 파일의 경로를 다룰 모듈을 로딩
const path = require('path');

var templatePath = path.join(__dirname, 'ex06-4-template.html');

// 템플릿 파일의 내용을 읽어 들인다.
const fs = require('fs');

// 동기방식이다.
var templateSrc = fs.readFileSync(templatePath);
var templateFn = handlebars.compile(templateSrc.toString());

app.get('/hello', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html;charset=UTF-8'
    });
    var resultStr = templateFn(req.query);
    res.write(resultStr);
    res.end();
});

app.listen(8000, ()=> {
    console.log('서버 실행중...');
});