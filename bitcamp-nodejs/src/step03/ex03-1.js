// 주제 : 요청정보 다루기
//

const http = require('http');

const server = http.createServer((req, res) => {
    console.log('someons asks...');
    
    console.log(req.url);
    
    res.writeHead(200, {
        'Content-Type': 'text/plan;charset=UTF-8'
    });
    
    res.write('');
    res.end();
    
});

server.listen(8000, () => {
    console.log('server starts...');
});