# 프로그래밍 준비
## 개발 도구 설치
- openjdk 10.0.1
- eclipse photon
- visual studio code
- git client
- scoop (package manager)
- scoop install gradle
- scoop install mariadb@10.3.7
- mysqld --install "mariadb" (관리자 모드에서 쉘 실행)
- 제어판 - 보안 - 관리자도구 - 서비스 - mariadb 실행
- scoop install mysql
- mysqld --install "mysql" (관리자)
- sc delete mariadb(cmd에서 관리자로)
- scoop install nodejs

## mysql 설정
'''
서버에 접속
> mysql -uroot -p (파워쉘에서 처음에는 루트 패스워드는 없음)
Enter password : 

root 사용자의 암호 설정
mysql> update user set authentication_string=password('1111') where user='root';

암호변경 후 권한 갱신
mysql> flush privileges;
mysql> quit;

다시 접속
>mysql -uroot -p
Enter password : 1111
'''

애플리케이션에서 DB에 접속할 때 사용할 사용자를 추가한다.
mysql> create user 'study'@'localhost' identified by '1111';

study 사용자가 사용할 데이터베이스 생성
mysql> create database studydb character set utf8 collate utf8_general_ci;

studydb의 사용 권한을 study에게 부여한다
mysql> grant all privileges on studydb.* to 'study'@'localhost';

study 사용자로 접속
mysql> quit 또눈 exit
> mysql -ustudy -p
Enter Password : 1111

study 사용자가 사용할 수 있는 데이터베이스 목록 보기.
mysql> show databases;

사용할 데이터베이스 선택
mysql> use studydb;

studydb에 존재하는 테이블 목록 보기
mysql> show tables;

studydb에 테이블 생성
bitcamp-sql/pms-ddl.sql 실행
mysql> SQL복사하여 붙여넣는다

'''

## Tomcat 설치
'''
1) 톰캣 다운로드
- tomcat.apache.org 에서 다운로드

2) 톰캣 설치
- c:\apps 폴더에 압축 푼다
'''

## eclipse 설정
'''
워크스페이스 설정
1) 문자집합 UTF8 설정하기
- Preferences/General/Workspace/Text file encoding
    - UTF-8로 설정한다
2) 에디터 기본 환경 설정
- Preferences/General/editors/text editors
    - 탭 크기를 2 또는 4로 설정
    - 탭을 스페이스로 표현한다. (insert spaces for tabs)
    - 한 줄 크기는 80자 정도 (show print margin, allow editors to override...)
    - 탭이나 공백에 대해 흐릿하게 표시하기 (show whitespace...)
    -
3) 자바 설정
- Preferences/JAVA/
    - installed JRE : jdk 위치 지정하기
    - code style/Formatter
    - compiler : 기본 컴파일 버전 설정
4) 웹 환경 설정
- Preferences/Web/
    - CSS Files : 문자 집합을 UTF-8로 설정
    - HTML Files : 문자 집합을 UTF-8로 설정
    - JSP Files : 문자 집합을 UTF-8로 설정
5) WAS 서버 환경 설정
- Preferences/Servers
    - Runtime Environment : 톰캣 서버 위치 설정
6) 애플리케이션을 배포하고 테스트할 톰캣 실행 환경 설정
- servers 뷰
    - 테스트용 실행 서버 추가
'''

## 웹 프로젝트 폴더 준비

'''
1) 예제 프로젝트 복사
java106-java-project를 bitcamp-cloud-computing 폴더로 복사한다.

2) 프로젝트 폴더를 이클립스에서 인식
-'gradle eclipse'를 실항하여 이클립스 설정 파일을 생성한다.
    - .project .classpath, .setting 등이 있어야만 이클립스는 해당 
'''


npm install