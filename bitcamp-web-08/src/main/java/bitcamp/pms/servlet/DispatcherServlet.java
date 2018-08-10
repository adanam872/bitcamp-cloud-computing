package bitcamp.pms.servlet;

import java.io.IOException;
import java.lang.reflect.Method;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import bitcamp.pms.annotation.RequestMapping;

@SuppressWarnings("serial")
@WebServlet("/app/*")
public class DispatcherServlet extends HttpServlet {

    @Override
    protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String pathInfo = request.getPathInfo();
        
        response.setContentType("text/html;charset=UTF-8");
        
        //ServletContext 보관소에 저장된 페이지 컨트롤러를 찾는다.
        ServletContext sc = request.getServletContext();
        Object pageController = sc.getAttribute(pathInfo);
        
        //페이지 컨트롤러 실행한다
        try {
            if (pageController == null) throw new Exception("해당 서비스를 찾지 못하였습니다.");
            
            
            //PageController 에 있는 메서드 중에서 @RequestMapping이라는
            //애노테이션이 붙은 메서드를 찾아서 호출한다.
            Method requestHandler = getRequestHandler(pageController.getClass());
            
            if (requestHandler == null) throw new Exception("요청핸들러가 없습니다");
            
            //페이지 컨트롤러의 메서드를 호출한다.
            String view = (String)requestHandler.invoke(pageController, request, response);
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

    private Method getRequestHandler(Class<?> clazz) {
        
        // 클래스 정보에서 메서드 정보를 추출한다.
        Method[] methods = clazz.getMethods();
        
        for (Method m : methods) {
            RequestMapping anno = m.getAnnotation(RequestMapping.class);
            if (anno != null) return m;
        }
        
        return null;
    }

}
