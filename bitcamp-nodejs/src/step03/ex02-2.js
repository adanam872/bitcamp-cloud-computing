// 주제 : 클라이언트에게 출력하기 - 콘텐트 타입 설정하기
//

const http = require('http');

const server = http.createServer((req, res) => {
    console.log('someons asks...');
    
    res.writeHead(200, {
        'Content-Type': 'text/plain;charset=UTF-8'
    });
    res.end('Hello!');
    
});

server.listen(8000, () => {
    console.log('server starts...');
});