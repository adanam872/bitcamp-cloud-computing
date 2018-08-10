// 주제 : 템플릿 엔진 사용

const express = require('express');
const app = express();

// 템플릿 엔진 모듈을 로딩한다
const handlbars = require('handlbars');

var templateSrc = '{{name}}님 안녕하세요?';
var templateFn = handlebars.compile(templateSrc);

app.get('/hello', (req, res) => {
    var resultStr = templateFn({name: '홍길동'});
    res.write(resultStr);
    res.end();
});

app.listen(8000, ()=> {
    console.log('서버 실행중...');
});