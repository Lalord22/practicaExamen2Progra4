package com.progra.countries;

import com.progra.countries.resources.Categorias;
import com.progra.countries.resources.Clientes;
import com.progra.countries.resources.Coberturas;
import com.progra.countries.resources.Login;
import com.progra.countries.resources.Marcas;
import com.progra.countries.resources.Modelos;
import com.progra.countries.resources.Polizas;
import com.progra.countries.resources.Usuarios;
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
        classes.add(Usuarios.class);
        classes.add(Clientes.class);
        classes.add(Polizas.class);
        classes.add(Coberturas.class);
        classes.add(Categorias.class);
        classes.add(Modelos.class);
        classes.add(Marcas.class);
        classes.add(Login.class);
        return classes;
    }      
}
