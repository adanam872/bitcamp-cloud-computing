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

import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import bitcamp.pms.annotation.RequestMapping;

//loadOnStartup=1 은 클라이언트 요청하지 않아도 톰캣서버가 시작될 때 자동 수행된다.

@SuppressWarnings("serial")
@WebServlet(value="/app/*", loadOnStartup=1)
public class DispatcherServlet extends HttpServlet {

    ApplicationContext iocContainer;
    
    // DispatcherServlet 객체가 한 번 생성되면 init()를 부르지 않는다.
    @Override
    public void init() throws ServletException {
        // DispatcherServlet이 본격적으로 클라이언트 요청을 처리하기 전에
        // Spring의 ContextLoaderListener가 준비한 IoC 컨테이너를 사용하려면
        // 다음과 같이 다른 클래스의 도움을 받아서 IoC 컨테이너를 꺼내야 한다.
        iocContainer = WebApplicationContextUtils.getWebApplicationContext(this.getServletContext());
        
        System.out.println("----------컨테이너 객체-----------");
        // IoC 컨테이너에 들어있는 객체를 한 번 출력해보자!
        String[] names = iocContainer.getBeanDefinitionNames();
        for (String name : names) {
            System.out.printf("%s ==> %s\n",name,iocContainer.getBean(name).getClass().getName());
        }
        System.out.println("----------------------------");
    }

    @Override
    protected void service(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String pathInfo = request.getPathInfo();

        response.setContentType("text/html;charset=UTF-8");

        // IoC 컨테이너에 어떤 객체들이
        // 페이지 컨트롤러 실행한다
        try {
            Object pageController = iocContainer.getBean(pathInfo);
            if (pageController == null)
                throw new Exception("해당 서비스를 찾지 못하였습니다.");

            // PageController 에 있는 메서드 중에서 @RequestMapping이라는
            // 애노테이션이 붙은 메서드를 찾아서 호출한다.
            Method requestHandler = getRequestHandler(pageController.getClass());

            if (requestHandler == null)
                throw new Exception("요청핸들러가 없습니다");

            // 페이지 컨트롤러의 메서드를 호출한다.
            String view = (String) requestHandler.invoke(pageController, request, response);
            if (view.startsWith("redirect:")) {
                response.sendRedirect(view.substring(9));
            } else {

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
            if (anno != null)
                return m;
        }

        return null;
    }

}
