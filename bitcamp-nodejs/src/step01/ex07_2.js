// 주제: 모듈을 정의하고 사용하기
//

var fn = require('./ex07_m.js');

// 클로저만 접근할 수 있는 변수이기에 객체마다 고유하다.
var obj1 = fn();
var obj2 = fn();

// obj1에 들어있는 클로저가 사용하는 result변수와
// obj2에 들어있는 클로저가 사용하는 result 변수가 다르다

console.log(obj1.plus(100));
console.log(obj1.minus(7));

console.log(obj2.plus(100));
console.log(obj2.multiple(7));

// result 변수는 리턴된 객체에 들어 있지 않다.
// plus(), minus() 등 클로저가 공유하는 메모리에 들어있다.
// 그래서 외부에서 직접 접근 할 수 없다. 자바 문법으로 따지면 일종의 private 변수가 된 것이다.
// 클로저가 공유하는 변수의 값을 알고싶다면 그 변수의 값을 꺼내는 클로저를 호출해야한다. 자바의 getter라고 할 수 있다.
// console.log(obj.result);

console.log(obj1.getResult());
console.log(obj2.getResult());

// 결론!
// => 다음과 같이 require()가 함수를 리턴하고,
// => var fn = require(...);
// => 그 함수가 객체를 리턴하는 상황이라면
//    var obj = fn();
// => 리턴된 객체마다 고유의 값을 다루기 위해 그렇게 모듈을 만든 것이락 생각하라