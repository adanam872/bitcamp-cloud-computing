// 주제 : 요청정보 다루기 - url에 따라 작업을 분리하기
//

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
    
    if (urlInfo.pathname === '/board/list') {
        res.write('게시물 목록')
    } else if (urlInfo.pathname === '/board/add') {
        res.write('게시물 등록')
    } else {
        res.write('해당 url을 지원하지 않음');
    }
    
    res.write(`name=${urlInfo.query.name}\n`);
    res.write(`age=${urlInfo.query.age}\n`);
    
    res.end();
    
});

server.listen(8000, () => {
    console.log('server starts...');
});