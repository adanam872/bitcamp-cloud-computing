package bitcamp.servlet;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
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

@WebServlet("/fileupload03")
public class FileUploadServlet03 extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        DiskFileItemFactory factory = new DiskFileItemFactory();
        ServletFileUpload upload = new ServletFileUpload(factory);

        InputStream fileContent = null;
        OutputStream fileOut = null;
        try {
            Map<String, List<FileItem>> paramMap = upload.parseParameterMap(request);

            FileItem nameItem = paramMap.get("name").get(0);
            FileItem ageItem = paramMap.get("age").get(0);
            FileItem photoItem = paramMap.get("photo").get(0);

            String newfilename = UUID.randomUUID().toString();
            String path = this.getServletContext().getRealPath("/files/" + newfilename);
            
            fileContent = photoItem.getInputStream();
            fileOut = new FileOutputStream(path);
            
            byte[] buf = new byte[1024];
            int len = 0;
            
            while ((len = fileContent.read(buf)) != -1) {
                fileOut.write(buf, 0, len);
            }
            
            fileOut.flush();
            
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
        } finally {
            try {
                fileContent.close();
                fileOut.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

    }
}
