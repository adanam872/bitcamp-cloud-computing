package bitcamp.pms.servlet.member;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import bitcamp.pms.dao.MemberDao;
import bitcamp.pms.domain.Member;

@SuppressWarnings("serial")
@WebServlet("/member/view")
public class MemberViewServlet extends HttpServlet {

    @Override
    protected void doGet(
            HttpServletRequest request, 
            HttpServletResponse response) throws ServletException, IOException {

        request.setCharacterEncoding("UTF-8");
        
        response.setContentType("text/html;charset=UTF-8");
        
        try {
            ServletContext sc = this.getServletContext(); //this 빼도 된다.
            MemberDao memberDao = (MemberDao)sc.getAttribute("memberDao");
            Member member = memberDao.selectone(request.getParameter("id"));

            request.setAttribute("member",member);
            request.getRequestDispatcher("view.jsp").forward(request, response);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
}
