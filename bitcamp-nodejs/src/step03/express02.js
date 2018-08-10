// 요청 핸들러를 관리 + 호출

const http = require('http');
const url = require('url');

module.exports = function() {
    return {
    requestHandlerMap: {},
    add(url, handler) {
        this.requestHandlerMap[url] = handler;
    },
    getHandler(url) {
        return this.requestHandlerMap[url];
    },
    listen(port, callback) {
        var mapper = this;
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
            
            var handler = mapper.getHandler(urlInfo.pathname);
            
            if (handler) {
                handler(urlInfo, req, res);
            } else {
                res.end('지원불가');
                return;
            }
            
            // 비동기 query호출 했기 때문에 응답 완료하면 안된다.
            // res.end();
        });
        
        server.listen(port, callback);
    }
    };
};