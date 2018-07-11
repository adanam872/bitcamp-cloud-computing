package bitcamp.pms.servlet;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import bitcamp.pms.controller.PageController;

@SuppressWarnings("serial")
@WebServlet("/app/*")
public class DispatcherServlet extends HttpServlet {

    @Override
    protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String pathInfo = request.getPathInfo();
        
        response.setContentType("text/html;charset=UTF-8");
        
        //ServletContext 보관소에 저장된 페이지 컨트롤러를 찾는다.
        ServletContext sc = request.getServletContext();
        PageController pageController = (PageController)sc.getAttribute(pathInfo);
        
        //페이지 컨트롤러 실행한다
        try {
            if (pageController == null) throw new Exception("해당 서비스를 찾지 못하였습니다.");
            String view = pageController.service(request, response);
                
            if ( view.startsWith("redirect:")) {
                response.sendRedirect(view.substring(9));
            } else  {
                
                RequestDispatcher rd = request.getRequestDispatcher(view);
                rd.include(request, response);
            } 
        } catch (Exception e) {
            request.setAttribute("error", e);
            RequestDispatcher rd = request.getRequestDispatcher("/error.jsp");
            rd.forward(request, response);
        }
    }
}
