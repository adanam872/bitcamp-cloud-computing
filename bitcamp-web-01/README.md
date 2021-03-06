# bitcamp-web-01 : 웹 프로젝트 폴더 준비

## 프로젝트 폴더 생성

```
> mkdir bitcamp-web-01
> cd bitcamp-web-01
```

## Maven 기본 디렉토리 구조를 생성

자바 애플리케이션 프로젝트를 위한 기본 폴더 및 예제 파일을 생성한다.
```
> gradle init --type java-application

```

웹 관련 폴더 추가
```
- src/main 폴더에 resources 폴더를 추가하라
- src/main 폴더에 webapp 폴더를 추가하라
```


## 이클립스 IDE 관련 설정 파일을 추가한다.

build.gradle 설정 파일에 eclipse 플러그인 추가
```
plugins {
    // 자바관련 빌드 명령 플러그인 추가
    id 'java'

    // 이클립스 관련 빌드 명령 플러그인 추가
    // id 'eclipse'
    
    id 'eclipse-wtp' //= eclipse + wtp
    
    // web archive 관련 빌드 명령을 추가해야 한다
    id 'war'
}
```

사용 가능한 명령어 확인하기
```
> gradle tasks --all
```

이클립스에 필요한 파일 생성
```
> gradle eclipseProject
> gradle eclipseClasspath
> gradle eclipseJdt
```

따로 안 하고 한 번에 하는 방법
```
> gradle eclipse
```

이클립스 파일 다 지우기
```
> gradle cleanEclipse
```


## 이클립스에서 프로젝트를 import

## 웹 애플리케이션을 테스트할 톰캣 실행환경 추가

## 웹 애플리케이션 배포 및 테스트