package bitcamp.servlet;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

@WebServlet("/fileupload02")
public class FileUploadServlet02 extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        DiskFileItemFactory factory = new DiskFileItemFactory();
        ServletFileUpload upload = new ServletFileUpload(factory);

        try {
            Map<String, List<FileItem>> paramMap = upload.parseParameterMap(request);

            FileItem nameItem = paramMap.get("name").get(0);
            FileItem ageItem = paramMap.get("age").get(0);
            FileItem photoItem = paramMap.get("photo").get(0);

            String newfilename = UUID.randomUUID().toString();
            String path = this.getServletContext().getRealPath("/files/" + newfilename);
            photoItem.write(new File(path));

            response.setContentType("text/html;charset=UTF-8");
            PrintWriter out = response.getWriter();
            out.println("<html><head><title>파일업로드</title></head><body>");
//        out.printf("name = %s\n", paramMap.get("name"));
//        out.printf("age = %s\n", paramMap.get("age"));
//        out.printf("photo = %s\n", paramMap.get("photo"));
//        out.printf("<a href = 'files/%s'>링크</a>", paramMap.get("photo"));
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
