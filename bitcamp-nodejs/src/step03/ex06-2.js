// 주제 : 템플릿 엔진 사용 - 웹 응답에 적용하기

const express = require('express');
const app = express();

// 템플릿 엔진 모듈을 로딩한다
const handlebars = require('handlebars');

var templateSrc = '{{name}}님 안녕하세요?';
var templateFn = handlebars.compile(templateSrc);

app.get('/hello', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/plan;charset=UTF-8'
    });
    var resultStr = templateFn({name: '홍길동'});
    res.write(resultStr);
    res.end();
});

app.listen(8000, ()=> {
    console.log('서버 실행중...');
});