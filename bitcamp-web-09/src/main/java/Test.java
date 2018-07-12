import java.io.File;
import java.io.FileFilter;
import java.io.FilenameFilter;
import java.lang.annotation.Annotation;
import java.lang.reflect.Constructor;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;

import bitcamp.pms.annotation.Component;
import bitcamp.pms.annotation.Controller;
import bitcamp.pms.annotation.Repository;
import bitcamp.pms.context.ApplicationContext;

public class Test {

    public static void main(String[] args) throws Exception {

/*        ClassLoader defaultClassLoader = ClassLoader.getSystemClassLoader();

        URL url = defaultClassLoader.getResource("bitcamp/pms");

        File file = new File(url.toURI());

        findClass(file, "bitcamp.pms");*/
        
        ApplicationContext iocContainer = 
                new ApplicationContext("bitcamp.pms");
        
        Object obj = iocContainer.getBean("/member/list");
        System.out.println("====> "+obj.getClass().getName());
        injectDependency();
    }

    private static void injectDependency() {
        // TODO Auto-generated method stub
        
    }

    static void findClass(File path, String packageName) {

        File[] subFiles = path.listFiles((File pathname) -> {

            if (pathname.isDirectory())
                return true;
            if (pathname.isFile() && pathname.getName().endsWith(".class"))
                return true;
            return false;
        });

        for (File subFile : subFiles) {
            if (subFile.isFile()) {
                String className = packageName + "." + subFile.getName().replace(".class", "");
                createObject(className);
            } else {
                findClass(subFile, packageName + "." + subFile.getName());
            }
        }
    }

    static HashMap<String, Object> objPool = new HashMap<>();

    private static void createObject(String className) {
        try {
            // 클래스 이름(패키지명 + 클래스명)으로 .class 파일을 찾아 로딩한다.
            Class<?> clazz = Class.forName(className);
            
            // @Component, @Controller, @Repository 애노테이션이 붙은 클래스가 아니라면객체를 생성하지 않는다.
            if (clazz.getAnnotation(Component.class) == null 
                    && clazz.getAnnotation(Controller.class) == null 
                    && clazz.getAnnotation(Repository.class) == null)
                return;
            
            String objName = getObjectName(clazz);
            System.out.println(objName);
            
            // 클래스 정보를 보고 기본 생성자를 알아낸다.
            Constructor<?> constructor = clazz.getConstructor();
            
            // 기본 생성자를 호출하여 객체를 생성한 후 객체 보관소에 저장한다.
            objPool.put(objName, constructor.newInstance());
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
    
    private static String getObjectName(Class<?> clazz) throws Exception {
        // 객체를 저장할 때 사용할 이름을 알아낸다.
        String objName = null;
        Component compAnno = clazz.getAnnotation(Component.class);
        if (compAnno != null) objName = compAnno.value();
        
        Controller ctrlAnno = clazz.getAnnotation(Controller.class);
        if (ctrlAnno != null) objName = ctrlAnno.value();
        
        Repository repoAnno = clazz.getAnnotation(Repository.class);
        if (repoAnno != null) objName = repoAnno.value();
        
        if (objName.length() == 0) return clazz.getCanonicalName();
        else return objName;
    }
}
