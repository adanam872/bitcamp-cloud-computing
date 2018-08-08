// 주제 : HTTP Server 만들기 - 클라이언트에게 응답 완료하기
// Node.js 는 single thread로 동작한다.
// Node.js의 http 서버는 대량 동시 요청을 처리하기에 적합하지 않다.

const http = require('http');

const server = http.createServer((req, res) => {
    console.log('someons asks...');
    
    // HTTP 응답을 완료해야 브라우저가 기다리지 않는다. 
    res.end();
});

server.listen(8000, () => {
    console.log('server starts...');
});