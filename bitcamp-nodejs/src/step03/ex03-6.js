// 주제 : 요청정보 다루기 - 파라미터 값 꺼내기
//

const http = require('http');
const url = require('url');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
    console.log('someons asks...');
    
    var urlInfo = url.parse(req.url, true);
    
    res.writeHead(200, {
        'Content-Type': 'text/plan;charset=UTF-8'
    });

    if (urlInfo.pathname !== "/") {
        res.end();
        return;
    }
    
    if (req.method !== 'POST') {
        res.end('GET 요청 지원 안 함');
        return;
    }
    
    // POST 요청 데이터 처리
    // 1) data 이벤트 처리
    // => 클라이언트로부 데이터르 받으면 data이벤트가 발생한다.
    //    그 이벤트에 등록된 함수가 있다면 호출해 준다.
    // 주의 ! 클라이언트 보낸 데이터를 모두 읽었을 때 발생하지 않고 일부 읽을 때 마다 알려주는 방식으로 동작
    // => 리스너(이벤트 핸들러)넘어오는 파라미터는 클라이언트가 보낸 
    //    데이터의 일부니다.
    var data = '';
    req.on('data', (chunk) => {
        data += chunk;
    });
    
    // 데이터를 모두 읽었을 때 응답을 완료해야 한다.
    req.on('end', () => {
        var params = querystring.parse(data);
        res.write(`name=${params.name} \n age=${params.age}`);
        res.end();
    });
    
    // 데이터를 읽을 때 호출 될 메서드를 등록한 후
    // 다음과 같이 바로 응답을 완료하면 안된다.
    // res.end()
    
    
    
});

server.listen(8000, () => {
    console.log('server starts...');
});