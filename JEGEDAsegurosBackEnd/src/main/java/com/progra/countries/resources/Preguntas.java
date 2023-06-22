package com.progra.countries.resources;

import com.progra.countries.logic.Pregunta;
import com.progra.countries.logic.PreguntaOptionData;
import com.progra.countries.logic.Service;

import jakarta.annotation.security.PermitAll;
import jakarta.annotation.security.RolesAllowed;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;

import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import java.util.List;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.core.Context;

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

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({"CLI"})
    public List<Pregunta> CargarPreguntas() throws Exception {

        return Service.instance().cargarPreguntas();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Boolean submitRespuesta(PreguntaOptionData preguntaOptionData) throws Exception {
        // Extract the pregunta and option value from the received data
        Pregunta pregunta = preguntaOptionData.getPregunta();
        String optionValue = preguntaOptionData.getRespuesta();
        

        // Invoke your service class or perform necessary operations with pregunta and optionValue
        // ...
        // Return a response indicating the success or failure of the operation
        return Service.instance().revisarRespuesta(pregunta, optionValue);
    }
    
    @POST
    @Path("/nuevaPregunta")
    @Consumes(MediaType.APPLICATION_JSON)
    public Boolean agregarPregunta(PreguntaOptionData preguntaOptionData) throws Exception {
        // Extract the pregunta and option value from the received data
        Pregunta pregunta = preguntaOptionData.getPregunta();
        String optionValue = preguntaOptionData.getRespuesta();
        

        // Invoke your service class or perform necessary operations with pregunta and optionValue
        // ...
        // Return a response indicating the success or failure of the operation
        return Service.instance().revisarRespuesta(pregunta, optionValue);
    }
}
