// 주제 : 요청정보 다루기 - Quiz 계산기를 만들라
// /calc?a=100&b=200&op=%2B

const http = require('http');

// utl 분석에 사용할 모듈 로딩
const url = require('url');

const server = http.createServer((req, res) => {
    var urlInfo = url.parse(req.url, true);
    
    if (urlInfo.pathname === '/favicon.ico') {
        res.end();
        return;
    }
    
    console.log('someons asks...');
   
    res.writeHead(200, {
        'Content-Type': 'text/plan;charset=UTF-8'
    });
    
    if (urlInfo.pathname === '/calc') {
        res.write('계산결과\n');
        var ret;
        if (urlInfo.query.op == '+') {
            ret = parseInt(urlInfo.query.a) + parseInt(urlInfo.query.b);
        } else if (urlInfo.query.op == '-') {
            ret = parseInt(urlInfo.query.a) - parseInt(urlInfo.query.b);
        } else if (urlInfo.query.op == '*') {
            ret = parseInt(urlInfo.query.a) * parseInt(urlInfo.query.b);
        } else if (urlInfo.query.op == '/') {
            ret = parseInt(urlInfo.query.a) / parseInt(urlInfo.query.b);
        }
        res.write(urlInfo.query.a + urlInfo.query.op + urlInfo.query.b + "=" + ret);
    } else {
        res.end('지원불가');
        return;
    }
    
    res.end();
    
});

server.listen(8000, () => {
    console.log('server starts...');
});