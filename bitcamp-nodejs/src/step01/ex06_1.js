// 주제: 모듈을 정의하고 사용하기

var fn = require('./ex06_m.js');

var obj = fn();

console.log(obj.plus(10, 20));
console.log(obj.minus(10, 20));
console.log(obj.multiple(10, 20));
console.log(obj.divide(10, 20));