# bitcamp-web-02 : 서블릿
- pms2_member 테이블에 대한 CRUD 서블릿을 만들기

## 패키지 생성
bitcamp.pms.servlet 패키지 생성

## 회원 관리 서블릿 만들기
- servlet-api 의존 라이브러리 추가하기
    - mvnrepository.com에서 servlet-api 라이브러리 검색
    - build.gradle에 라이브러리 등록
        - 코드
        ```
            // servlet api
            // https://mvnrepository.com/artifact/javax.servlet/javax.servlet-api
            // providedCompile로 설정된 라이브러리는 개발할 때만 사용하고, 배포할 때는 제외되는 라이브러리이다.
            providedCompile group: 'javax.servlet', name: 'javax.servlet-api', version: '4.0.1'
        ```
    - 'gradle eclipse' 실행하여 .classpath 갱신
    - 이클립스 프로젝트 refresh
    - mysqljdbc 추가
- bitcamp.pms.servlet.member
- MemberListServlet, MemberViewServlet, MemberAddServlet, MemberUpdateServlet, MemberDeleteServlet 클래스 생성
    - HttpServlet을 상속받아서 doGet method 를 오버라이드한다