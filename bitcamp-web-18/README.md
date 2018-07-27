# web-18 : AJAX를 이요하여 Back-end 와 Front-end 분리하기
- JSP에서 HTML을 렌더링하는 대신에 HTML의 자바스크립트를 이용하여 서버에서 데이터를 받아서 UI를 출력하는 방식으로 바꾼다.

## JSON 데이터 요청을 처리하는 프론트 컨트롤러 설정하기
- web.xml에 json/* 요청을 처리할 프론트 컨트롤러 추가
- 콘텍스트로드리스너에서 관리하는 개체 중에 웹관련 컴포넌트들은 프론트 컨트롤러의 IoC컨테이너가 관리하도록 이관한다
- app-servlet.xnl, json-serblet.xml 생성
- web.xml 에서 프론트엔드 컨트롤러에 IoC컨테이너 설정파일 설정