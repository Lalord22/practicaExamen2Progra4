package com.progra.countries;

import com.progra.countries.resources.Login;
import com.progra.countries.resources.Preguntas;

import jakarta.annotation.security.DeclareRoles;
import jakarta.ws.rs.ApplicationPath;
import jakarta.ws.rs.core.Application;
import java.util.HashSet;
import java.util.Set;

/**
 * Configures Jakarta RESTful Web Services for the application.
 * @author Lalo, no olvides darle like y suscribir a lalsalvargas en instagram 
 */
@ApplicationPath("api")
@DeclareRoles({"ADM","CLI"})
public class JakartaRestConfiguration extends Application {
    @Override
    public Set<Class<?>> getClasses() {
        HashSet<Class<?>> classes = new HashSet<>();
        classes.add(Login.class);
        classes.add(Preguntas.class);
        return classes;
    }      
}
