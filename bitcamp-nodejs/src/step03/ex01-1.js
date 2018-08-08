// 주제 : HTTP Server 만들기 - 서버 실행


// 1) module loading
const http = require('http');

// 2) create http server object
// => parameter is called when someone asks. it is function.
const server = http.createServer((req, res) => {
    console.log('someons asks...');
    
    // 웹 브라우저 요청을 받았지만 응답을 하지 않았기 때문에 웹 브라우저는 계속 응답을 기다리는 상태에 있을 것이다.
});

// 3) start http server
// => listen(portnumber, function called after starting server)
server.listen(8000, () => {
    console.log('server starts...');
});