# web-18 : AJAX를 이요하여 Back-end 와 Front-end 분리하기
- JSP에서 HTML을 렌더링하는 대신에 HTML의 자바스크립트를 이용하여 서버에서 데이터를 받아서 UI를 출력하는 방식으로 바꾼다.

## JSON 데이터 요청을 처리하는 프론트 컨트롤러 설정하기
- web.xml에 json/* 요청을 처리할 프론트 컨트롤러 추가
- 콘텍스트로드리스너에서 관리하는 개체 중에 웹관련 컴포넌트들은 프론트 컨트롤러의 IoC컨테이너가 관리하도록 이관한다
- app-servlet.xnl, json-serblet.xml 생성
- web.xml 에서 프론트엔드 컨트롤러에 IoC컨테이너 설정파일을 등록한다

## 페이지 컨트롤러 추가
- *.json.MemberController 추가
- 페이지 컨트롤러를 @RestController로 선언
- 리턴 값으로 JSP URL 대신 데이터 객체를 리턴 

### html
- member/list.html : AJAX 기반 list 페이지 출력 HTML 생성
- member/view.html : AJAX 기반 회원 상세조회 페이지 출력 HTML
- html/js/common.js : Query String 분석 함수 추가

### html2
- jquery를 흉내낸 자바스크립트 파일 제작

### html3
- Jquery 적용 기존의 bit.js 대신 jquery 라이브러리를 적용

### html4
- 부트스트랩 적용
- UI에 붙스트렙 CSS 적용
- css 폴더 만들어 공통 css 관리

### html5
- HTML과 JavaScript 분리하기
- 유지보수를 쉽게 만들기 위해 분리

### html6
- 모바일 웹앱 배포 준비
- 외부 라이브러리를 모두 로컬로 가져온다.
- npm을 사용사여 외부 라이브러리를 가져온다.
    - /webapp/html6 폴더에서 npn init를 실행 : package.json 생성
    - jquery 라이브러리 가져온다. : npm install jquery --save (나중에는 npm install 만 치면 dependency에 들어있는걸 자동으로 다운로드)
    - popper : npm install poper.js --save
    - bootstrap : npm install bootstrap --save

- 모바일 앱에서 서버에 접속하려면 정확한 서버 주소를 입력해야 한다. html, css, javascript가 사용자 핸드폰에 배포되기 때문이다.
- src/main/webapp/html/js 폴더에 common.js 파일을 반든다
- common.js에 서버 주소를 등록한다.
- 나머지 모든 파일에서 AJAX 요청 주소를 변경한다.

- Phonegap을 이용하여 모바일 웹앱 배치하기
- iOS/Android phonegap 앱 설치


- Cross Domain 설정
- @CrossOrigin 혹은 <mvc-cors> 태그로 설정하기

### html17
템플릿 엔진 적용하여 HTML 태그를 생성한다
- handlebars 라이브러리 가져오기
- 'npm install handlebars --save'
- html 페이지 라이브러리 삽입
- <script src='...'></script>
- 자바스크립트 사용하기 
