package com.progra.countries.resources;

import com.progra.countries.logic.Pregunta;
import com.progra.countries.logic.PreguntaOptionData;
import com.progra.countries.logic.Respuesta;
import com.progra.countries.logic.Service;
import com.progra.countries.logic.Usuario;

import jakarta.annotation.security.PermitAll;
import jakarta.annotation.security.RolesAllowed;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
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
import java.util.Random;

@Path("/preguntas")
@PermitAll
public class Preguntas {

    @GET
    @Path("/buscaTopic/{topic}")
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({"CLI"})
    public List<Pregunta> listaPreguntasPorTopic(@PathParam("topic") String topic, @Context HttpServletRequest request) throws Exception {
        return Service.instance().retornaPreguntasPorTopic(topic);
    }
    
    protected Usuario getLoggedInUser(HttpServletRequest request) {
    HttpSession session = request.getSession(false);
    if (session != null) {
        return (Usuario) session.getAttribute("user");
    }
    return null;
}


 @GET
@Produces(MediaType.APPLICATION_JSON)
@RolesAllowed({"CLI"})
public List<Pregunta> cargarPreguntas(@Context HttpServletRequest request) throws Exception {
    Usuario loggedInUser = getLoggedInUser(request);
    if (loggedInUser != null) {
        return Service.instance().cargarPreguntas(loggedInUser);
    } else {
        throw new NotAuthorizedException("User not logged in");
    }
}



    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Boolean submitRespuesta(@Context HttpServletRequest request, PreguntaOptionData preguntaOptionData) throws Exception {
        // Extract the pregunta and option value from the received data
         Usuario loggedInUser = getLoggedInUser(request);
        
        Pregunta pregunta = preguntaOptionData.getPregunta();
        String optionValue = preguntaOptionData.getRespuesta();

        // Invoke your service class or perform necessary operations with pregunta and optionValue
        // ...
        // Return a response indicating the success or failure of the operation
        return Service.instance().revisarRespuesta(pregunta, optionValue, loggedInUser );
    }

    @POST
@Path("/nuevaPregunta")
@Consumes(MediaType.APPLICATION_JSON)
public Response agregarPregunta(PreguntaOptionData preguntaOptionData) {
    try {
        Service.instance().resgistraPreguntaYRespuesta(preguntaOptionData);
        return Response.ok().build();
    } catch (Exception e) {
        // Handle the exception and return an error response
        return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
    }
}



}
