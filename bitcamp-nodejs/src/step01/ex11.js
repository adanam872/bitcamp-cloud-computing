// 주제: require() 동작 원리
//

function require(moduleName) {
    // 1) npm이 모듈들을 저장하는 폴더에 해당 이름의 모듈이 있는지 찾아본다.
    //    만약 있다면 그 모듈 파일을 읽어들여 실행한다.
    // 2) 없다면, 파일 경로에서 해당 파일을 찾아 실행한다.
    // 3) 모듈에서 exports에 보관한 객체를 꺼내 따로 이름을 붙여 관리한다.
    // 4) 그리고 그 객체를 리턴한다.
    
    // 위의 설명을 가상으로 만들어 보자!
    var moduleMap = {};
    
    if (!moduleName[moduleName]) 
    {
        // 모듈을 실행 한 수 그 모듈 이름으로 exports 보관
        moduleMap[moduleName] = {
                value: parseInt(Math.random() * 100)
        };      
    }
    return moduleMap[moduleName];
}