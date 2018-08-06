package bitcamp.servlet;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.UUID;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

// Servlet 3.0 부터 멀티파트 데이터를 처리하는 API를 제공한다.
// 멀티파트 데이터를 처리하는 서블릿은 멀티파트 처리에 대한 정보를 애노테이션 또는 web.xml(DD파일 - deployment descripter)에 설정

// 애노테이션으로 설정하기
@MultipartConfig(fileSizeThreshold = 1024 * 1024, // 1MB를 넘어가는 파일일 경우 메모리에 저장하지 말고 임시폴더에 저장
        maxFileSize = 1024 * 1024 * 2, // 한개 파일의 최대 크기를 제한한다.
        maxRequestSize = 1024 * 1024 * 2 * 10) // 요청데이터 전체 크기를 제한한다.
@WebServlet("/fileupload04")
public class FileUploadServlet04 extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        try {

            String name = request.getParameter("name");
            String age = request.getParameter("age");
            Part photo = request.getPart("photo");
            
            String newfilename = UUID.randomUUID().toString();
            String path = this.getServletContext().getRealPath("/files/" + newfilename);

            photo.write(path);
            
            response.setContentType("text/html;charset=UTF-8");
            PrintWriter out = response.getWriter();
            out.println("<html><head><title>파일업로드</title></head><body>");
            out.println("<p><img id='img1'></p>");
            out.println("<script>");
            out.println("setTimeout(() => {");
            out.printf("document.getElementById('img1').src = 'files/%s';", newfilename);
            out.println("}, 5000);");
            out.println("</script>");

            out.println("</body></html>");
        } catch (Exception e) {
            e.printStackTrace();
        }

    }
}
