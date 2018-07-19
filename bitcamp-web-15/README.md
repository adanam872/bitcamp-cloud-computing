# web-15 : 요청 핸들러의 파라미터와 리턴 값 다루기
- 요청핸들러의 파라미터로 가능한 타입을 알아본다.
- 요청 핸들러의 리턴 값으로 가능한 타입을 알아본다.

## 요청핸들러의 매트릭스 변수 활성화 시키기
- application-context.xml에서 다음과 같이 설정을 변경한다.
```
<mvc:annotation-driven enable-matrix-varible=true>
```

## 각 페이지 컨트롤러에 대해 요청 핸들러의 파라미터, 리턴 값, 애노테이션을 정리한다.

## CRUD 관련메서드는 한 개의 컨트롤러 클래스에 묶는다.
- MemberXxxController 들을 MemberController로 합친다.