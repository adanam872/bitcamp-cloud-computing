// 주제 : 요청정보 다루기 - url 분석
//

const http = require('http');

// utl 분석에 사용할 모듈 로딩
const url = require('url');

const server = http.createServer((req, res) => {
    console.log('someons asks...');
    
    console.log(req.url);
    
    var urlInfo = url.parse(req.url);
    
    console.log('href=', urlInfo.href);
    console.log('pathname=', urlInfo.pathname);
    console.log('search=', urlInfo.search);
    console.log('query=', urlInfo.query);
    
    res.writeHead(200, {
        'Content-Type': 'text/plan;charset=UTF-8'
    });
    
    res.write('');
    res.end();
    
});

server.listen(8000, () => {
    console.log('server starts...');
});