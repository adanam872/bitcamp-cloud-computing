# bitcamp-web-10 : SPRING IoC Container 도입
- 기존에 작성한 IoC 컨테이너 대신에 Spring IoC 컨테이너를 사용한다.

## Spring IoC 라이브러리 추가
- mvnrepository.com 에서 spring-context 라이브러리를 찾는다.
- build.gradle에 의존 라이브러리 정보를 추가한다.
- 파우쉘에서 gradle eclipse 명령을 다시 실행해서 추가한 라이브러리를 자동으로 다운로드 받는다.
- gradle eclipse 명령을 실행한 뒤에는 반드시 eclipse에서 refresh 해 주도록 한다.

## ContextLoaderListener에서 Spring IoC 컨테이너 준비하기
- 기존의 ApplicationContext 대신에 Spring IoC 컨테이너 객체를 생성한다.
- bitcamp/pms/config/application-context.xml 생성 

## DispatcherServlet에서 스프링 IoC 컨테이너를 사용하기
- 기존의 applicationContext 대신 스프링 ioC 컨테이너에 들어 있는 페이지 컨트롤러를 찾아 실행한다.

## ApplicationContext 클래스 제거한다

## 우리가 작성한 애노테이션 제거한다.

## DAO와 페이지 컨트롤러의 애노테이션 패키지 변경