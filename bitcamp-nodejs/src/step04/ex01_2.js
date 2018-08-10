// 주제 : express 사용하기 - 서버 실행하기

// 모듈준비
const app = require('express')();

// URL에 대해 함수를 연결한다
app.get('/test01', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/plan;charset=UTF-8'
    });
    res.write('test01');
});

// 서버 실행하기
app.listen(8000, () => {
    console.log("server on");
});