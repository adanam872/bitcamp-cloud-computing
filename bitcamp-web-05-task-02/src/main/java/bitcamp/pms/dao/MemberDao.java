package bitcamp.pms.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionException;
import org.apache.ibatis.session.SqlSessionFactory;

import bitcamp.pms.domain.Member;

public class MemberDao {

    SqlSessionFactory sqlSessionFactory;

    public MemberDao(SqlSessionFactory sqlSessionFactory) {
        this.sqlSessionFactory = sqlSessionFactory;
    }

    public List<Member> selectList() throws Exception {

        try (SqlSession sqlSession = sqlSessionFactory.openSession();) {
            System.out.println("=====================");
            return sqlSession.selectList("member.selectList");
        }
    }

    public Member selectone(String id) throws Exception {

        try (SqlSession sqlSession = sqlSessionFactory.openSession();) {
            return sqlSession.selectOne("member.selectOne", id);
        }
    }

    public int update(Member member) throws Exception {

        try (SqlSession sqlSession = sqlSessionFactory.openSession();) {
            int count = sqlSession.update("member.update", member);
            sqlSession.commit();
            return count;
        }
    }

    public int delete(String id) throws Exception {
        
        try (SqlSession sqlSession = sqlSessionFactory.openSession();) {
            int count = sqlSession.delete("member.delete", id);
            sqlSession.commit();
            return count;
        }
    }

    public int insert(Member member) throws Exception {

        try (SqlSession sqlSession = sqlSessionFactory.openSession();) {
            int count = sqlSession.insert("member.insert", member);
            sqlSession.commit();
            return count;
        }
    }
}
