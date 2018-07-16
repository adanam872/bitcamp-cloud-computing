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
    protected void service(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String pathinfo = request.getPathInfo();
        response.setContentType("text/html;charset=UTF-8");

        ServletContext sc = request.getServletContext();
        PageController pageController = (PageController) sc.getAttribute(pathinfo);

        try {
            String view = pageController.service(request, response);
            if (view != null && view.startsWith("redirect:")) {
                response.sendRedirect(view.substring(9));
            } else if (view != null) {
                RequestDispatcher rd = request.getRequestDispatcher(view);
                rd.include(request, response);
            }
        } catch (Exception e) {
            RequestDispatcher rd = request.getRequestDispatcher("/error.jsp");
            rd.forward(request, response);
        }
    }
}
