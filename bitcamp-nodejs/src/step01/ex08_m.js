// 모듈 정의 VI
// - 모듈변수 사용하기

var result = 0;

module.exports= {
        plus(value) {return result += value},
        minus(value) {return result -= value},
        multiple(value) {return result *= value},
        divide(value) {return result /= value},
        getResult() {return result}
};
