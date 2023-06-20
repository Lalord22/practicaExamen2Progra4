package com.progra.countries.resources;

import com.progra.countries.logic.Categoria;
import com.progra.countries.logic.Cobertura;
import com.progra.countries.logic.Service;
import jakarta.annotation.security.PermitAll;
import jakarta.annotation.security.RolesAllowed;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

@Path("/coberturas")
@PermitAll
public class Coberturas {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({"CLI", "ADM"})
    public List<Cobertura> getCoberturas() {
        return Service.instance().cargarCoberturas();
    }

    @POST
    @Path("/register")
    @Consumes(MediaType.APPLICATION_JSON)
    @RolesAllowed({"ADM"})
    public Response agregarCobertura(Cobertura cobertura) {
        try {
            // Call the agregaCobertura method with the received Cobertura object
            Service.instance().agregaCobertura(cobertura);
            return Response.status(Response.Status.OK).build();
        } catch (Exception e) {
            e.printStackTrace(); // Print the exception stack trace for debugging purposes
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({"CLI", "ADM"})
    public Cobertura getCoberturaById(@PathParam("id") String coverageId) {
        try {

            return Service.instance().cargarCoberturaById(coverageId);
        } catch (Exception e) {
            // Handle the exception appropriately (e.g., log the error, return an error response)
            // You can customize the error handling based on your application's requirements
            return null;
        }
    }

    @GET
    @Path("/poliza/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({"CLI", "ADM"})
    public List<Cobertura> getCoberturasByPolizaId(@PathParam("id") int polizaId) {
        try {
            return Service.instance().cargarCoberturasByPolizaId(polizaId);
        } catch (Exception e) {
            e.printStackTrace(); // Print the exception stack trace for debugging purposes
            return null;
        }
    }

}
