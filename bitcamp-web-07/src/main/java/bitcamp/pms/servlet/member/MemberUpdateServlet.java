package bitcamp.pms.servlet.member;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import bitcamp.pms.dao.MemberDao;
import bitcamp.pms.domain.Member;


@SuppressWarnings("serial")
@WebServlet("/member/update")
public class MemberUpdateServlet extends HttpServlet {

    @Override
    protected void doPost(
            HttpServletRequest request, 
            HttpServletResponse response) throws ServletException, IOException {
        
        request.setCharacterEncoding("UTF-8");
               
        
        try {
            Member member = new Member();
            ServletContext sc = this.getServletContext(); //this 빼도 된다.
            MemberDao memberDao = (MemberDao)sc.getAttribute("memberDao");
            member.setId(request.getParameter("id"));
            member.setEmail(request.getParameter("email"));
            member.setPassword(request.getParameter("password"));

            int count = memberDao.update(member);
            if (count == 0) {
                request.setAttribute("view", "/member/updatefail.jsp");
            } else {               
                request.setAttribute("view", "redirect:list");
            }
            
        } catch (Exception e) {
            request.setAttribute("error", e);
        }
    }
    

}
