package com.progra.countries.resources;


import com.progra.countries.logic.Pregunta;
import com.progra.countries.logic.Service;

import com.progra.countries.logic.Usuario;
import jakarta.annotation.security.PermitAll;
import jakarta.annotation.security.RolesAllowed;
import jakarta.json.bind.annotation.JsonbTransient;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.NotAuthorizedException;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import java.util.List;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.Response;
import java.util.ArrayList;

@Path("/preguntas")
@PermitAll
public class Preguntas {

    

    

    @GET
    @Path("/buscaTopic/{topic}")
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({ "CLI"})
    public List<Pregunta> listaPreguntasPorTopic(@PathParam("topic") String topic, @Context HttpServletRequest request) throws Exception {
        return Service.instance().retornaPreguntasPorTopic(topic) ;
    }

   
    
    

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({ "CLI"})
    public List<Pregunta> CargarPreguntas() throws Exception {
        
        return Service.instance().cargarPreguntas();
    }

    

    
}
