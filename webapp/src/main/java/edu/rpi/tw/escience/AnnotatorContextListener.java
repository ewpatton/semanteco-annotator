package edu.rpi.tw.escience;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

@WebListener
public class AnnotatorContextListener implements ServletContextListener {
    @Override
    public void contextInitialized(ServletContextEvent sce) {
        ServletContext context = sce.getServletContext();
        System.setProperty("AnnotatorRootPath", context.getRealPath("/"));
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
    }
}
