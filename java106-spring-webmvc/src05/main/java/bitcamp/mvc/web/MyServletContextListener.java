package bitcamp.mvc.web;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

@WebListener
public class MyServletContextListener implements ServletContextListener {
  //톰캣 서버가 시작했을 때 알림을 받고 싶으면 ServletContextListener 규칙에 따라서 클래스를 작성
    @Override
    public void contextInitialized(ServletContextEvent sce) {
        System.out.println("contextInitialized()......");
    }
    
    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        System.out.println("contextDestroyed()......");
    }
}
