// 주제 : 클라이언트에게 출력하기 - 콘텐트 타입 설정하기
//

const http = require('http');

const server = http.createServer((req, res) => {
    console.log('someons asks...');
    
    res.writeHead(200, {
        'Content-Type': 'text/html;charset=UTF-8'
    });
    
    res.write('<html>');
    res.write('<head>');
    res.write('<title> Node.js </title>');
    res.write('</head>');
    res.write('<body>');
    res.write('<h1>Node.js</h1>');
    res.write('</body>');    
    res.write('</html>');
    res.end();
    
});

server.listen(8000, () => {
    console.log('server starts...');
});