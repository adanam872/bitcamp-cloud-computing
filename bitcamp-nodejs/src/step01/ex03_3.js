// 주제: 모듈을 정의하고 사용하기 II
//

// 리턴값 detruturing 
// {원래프로퍼티명:변수명, 원래프로퍼티명:변수명, ...}
var {plus:p, minus:m} = require('./ex03_m.js');

console.log(p(10, 20));
console.log(m(10, 20));