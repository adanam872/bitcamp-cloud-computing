// 주제 : HTTP Server 만들기 - 클라이언트에게 응답 완료하기
// Node.js 는 single thread로 동작한다.
// Node.js의 http 서버는 대량 동시 요청을 처리하기에 적합하지 않다.

const http = require('http');

const server = http.createServer((req, res) => {
    console.log('someons asks...');
    
    setTimeout(() => {res.end();},5000);
    
});

server.listen(8000, () => {
    console.log('server starts...');
});