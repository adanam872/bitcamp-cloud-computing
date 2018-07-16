# bitcamp-web-10 : SPRING Mybatis 연동하기
- 기존에 작성한 IoC 컨테이너 대신에 Spring IoC 컨테이너를 사용한다.

## 라이브러리 추가
- mybaris-spring 라이브러리를 찾는다.
- build.gradle에 의존 라이브러리 정보를 추가한다.
- 파우쉘에서 gradle eclipse 명령을 다시 실행해서 추가한 라이브러리를 자동으로 다운로드 받는다.
- gradle eclipse 명령을 실행한 뒤에는 반드시 eclipse에서 refresh 해 주도록 한다.

## mybatis에서 제공하는 SqlSessionFactoryBean 객체 사용하기
- 기존의 SqlSessionFactoryBean 대신에 Mybatis-Spring에서 제공하는 클래스 사용.
- Mybatis를 스프링과 연동하면 DataSourc는 Spring에 설정된 것을 사용해야 한다.
- Mybatis 설정 파일에 등록된 DataSource는 사용하지 않는다.

## Spring 에 DataSource 등록하기
- mvnrepository.com에서 "commons-dbcp" 검색하여 library를 찾는다.
- 라이브러리를 build.gradle 파일에등록하고, gradle을 이용해 가져온다.
- 웹 프로젝트를 refrash한다.
- application-context.xml 스프링 설정파일에 DataSource를 설정한다.
- Spring에서 DataSource를 설정할 때는 spring-jdbc 라이브러리를 추가해야 한다.
- 트랜잭션 관리자도 Spring에 등록한다.

## DAO구현체를 자동 생성하는 MapperScannerConfigurer 등록하기
- Mybatis에서 제공하는 DAO 구현체 자동생성기를 등록하면 개발자가 DAO클래스를 직접 작성할 필요가 없다.
- 대신 개발자는 DAO 인터페이스만 만들면 된다.

## 기존의 DAO 클래스를 인터페이스로 변경하기
- 기존에 작성된 DAO 클래스를 인터페이스로 변경한다.
- 단, 인터페이스명과 SQL 맵퍼의 namespace가 같게 해야 한다. 패키지 명까지 네임스페이스에 표현 bitcamp.pms.dao.MemberDao
- 인터페이스의 메서드 명과 SQL의 id도 같아야 한다.
- 인터페이스의 메서트 파라미터는 한 개여야 한다. 그래서 hashmap으로 작성해서 하나만 넘긴다.
- 물론 SQL의 parameterType과 같아야 한다. 