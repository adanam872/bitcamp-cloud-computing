# bitcamp-web-12 : SPRING WEB MVC

## 라이브러리 추가
- spring-webmvc 라이브러리를 찾는다.
- build.gradle에 의존 라이브러리 정보를 추가한다.
- 파우쉘에서 gradle eclipse 명령을 다시 실행해서 추가한 라이브러리를 자동으로 다운로드 받는다.
- gradle eclipse 명령을 실행한 뒤에는 반드시 eclipse에서 refresh 해 주도록 한다.

## Sprng WebMVC의 ContextLoaderListener 사용하기
- 기존에 직접 작성했던 ContextLoaderListener 대신에 Spring WebMVC에서 제공하는 ContextLoaderListener 클래스를 사용한다.
- /WEB-INF/web.xml에 리스너를 등록해야 한다.