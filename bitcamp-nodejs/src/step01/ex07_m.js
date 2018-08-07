// 모듈 정의 III
// - 응용 : private 변수를 갖는 객체 만들기

module.exports= function() {
    var result = 0;
    
    return {        
        plus(value) {return result += value},
        minus(value) {return result -= value},
        multiple(value) {return result *= value},
        divide(value) {return result /= value},
        getResult() {return result}
    };
};
