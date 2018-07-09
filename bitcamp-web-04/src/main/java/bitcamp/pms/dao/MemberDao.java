package bitcamp.pms.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import bitcamp.pms.domain.Member;

public class MemberDao {
    
    static {
        try {
            Class.forName("com.mysql.jdbc.Driver");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    String jdbcUrl;
    String username;
    String password;
    
    public MemberDao(String jdbcUrl, String username, String password) {
        this.jdbcUrl = jdbcUrl;
        this.username = username;
        this.password = password;
    }
    
    public List<Member> selectList() throws Exception {
        
        try (
            Connection con = DriverManager.getConnection(
                jdbcUrl, username, password);
            PreparedStatement stmt = con.prepareStatement(
                "select mid, email from pms2_member");
            ResultSet rs = stmt.executeQuery();) {
            
            ArrayList<Member> list = new ArrayList<>();
            while (rs.next()) {
                Member member = new Member();
                member.setId(rs.getString("mid"));
                member.setEmail(rs.getString("email"));
                list.add(member);
            }
            
            return list;
        }
    }
    
    public Member selectone(String id) throws Exception {
        
        Member member = new Member();
        
        try (
            Connection con = DriverManager.getConnection(
                    jdbcUrl, username, password);
            PreparedStatement stmt = con.prepareStatement(
                "select mid,email from pms2_member where mid=?");) {
            
            stmt.setString(1, id);
            
            
            try (ResultSet rs = stmt.executeQuery();) {
                if (!rs.next()) 
                    throw new Exception("유효하지 않은 멤버 아이디입니다.");
                else {
                    member.setId(id);
                    member.setEmail(rs.getString("email"));
                }
            }
        }
        
        return member;
    }
    
    public int update(Member member) throws Exception {
        
        int count = 0;
        try (
            Connection con = DriverManager.getConnection(
                    jdbcUrl, username, password);
            PreparedStatement stmt = con.prepareStatement(
                "update pms2_member set email=?, pwd=password(?) where mid=?");) {
            
            stmt.setString(1, member.getEmail());
            stmt.setString(2, member.getPassword());
            stmt.setString(3, member.getId());
            
            count = stmt.executeUpdate();
        }
        return count;
    }
    
    public int delete(String id) throws Exception {
        
        int count = 0;
        try(
        Connection con = DriverManager.getConnection(
                jdbcUrl, username, password);
        PreparedStatement stmt = con.prepareStatement(
                "delete from pms2_member where mid=?"); ) {

            stmt.setString(1, id);
            count = stmt.executeUpdate();

        }
        return count;
    }
    
    public void insert(Member member) throws Exception {
        
        try(Connection con = DriverManager.getConnection(
                jdbcUrl, username, password);
        PreparedStatement stmt = con.prepareStatement(
            "insert into pms2_member(mid,email,pwd) values(?,?,PASSWORD(?))");) {
        
        
            stmt.setString(1, member.getId());
            stmt.setString(2, member.getEmail());
            stmt.setString(3, member.getPassword());
            stmt.execute();
        }
    }
}
