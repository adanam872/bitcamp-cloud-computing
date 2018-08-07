// 주제: 모듈을 실행하는 과정 알아보기
//

// 모듈에서 exports 객체에 아무것도 담지 않으면 기본이 그냥 빈 객체이다.
// require()를  여러번 호출하더라도 module은 한 번만 실행된다.
var obj = require('./ex09_m');

console.log(obj);