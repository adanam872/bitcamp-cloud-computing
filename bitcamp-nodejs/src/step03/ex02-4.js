// 주제 : 클라이언트에게 출력하기 - 멀티라인 처리
//

const http = require('http');

const server = http.createServer((req, res) => {
    console.log('someons asks...');
    
    res.writeHead(200, {
        'Content-Type': 'text/html;charset=UTF-8'
    });
    
    res.write('<html>\
    <head>\
    <title> Node.js </title>\
    </head>\
    <body>\
    <h1>Node.js</h1>\
    </body>\
    </html>');
    res.end();
    
});

server.listen(8000, () => {
    console.log('server starts...');
});