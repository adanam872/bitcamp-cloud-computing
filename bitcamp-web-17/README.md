# web-17 : 서비스 컴포넌트에 트랜잭션 적용
- 트랜잭션 관리자를 설정하여 서비스메서드에 트랜잭션을 적용한다.

## @Transaction annotation 으로 transaction 관리하기
- service object의 각 method에 대해 애노테이션으로 붙여 트랜잭션을 지정할 수 있다.

### Spring IoC 설정 파일에 Transaction Annotation을 처리할 객체를 등록한다.
```
<tx:annotation-drivem />
```

### service Object에 

## XML로 트랜잭션 관리하기

### AOP관련 의존 라이브러리 추가
- mvnrepository에서 'aspectj weaver' 라이브러리 검색

### Spring IoC Container 설정파일에 transaction 설정 파일 추가