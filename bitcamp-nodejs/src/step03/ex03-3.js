// 주제 : 요청정보 다루기 - 파라미터 값 꺼내기
//

const http = require('http');

// utl 분석에 사용할 모듈 로딩
const url = require('url');

const server = http.createServer((req, res) => {
    console.log('someons asks...');
    
    console.log(req.url);
    
    // query 객체에서 파라미터 명을 사용하여 값을 꺼내고 싶다면 두 번째 파라미터 값을 true로 설정하라
    
    var urlInfo = url.parse(req.url, true);
    
    res.writeHead(200, {
        'Content-Type': 'text/plan;charset=UTF-8'
    });
    
    res.write(`name=${urlInfo.query.name}\n`);
    res.write(`age=${urlInfo.query.age}\n`);
    
    res.end();
    
});

server.listen(8000, () => {
    console.log('server starts...');
});