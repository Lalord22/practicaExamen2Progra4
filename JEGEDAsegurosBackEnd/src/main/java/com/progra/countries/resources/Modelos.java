package com.progra.countries.resources;

import com.progra.countries.logic.Modelo;
import com.progra.countries.logic.Service;
import jakarta.annotation.security.PermitAll;
import jakarta.annotation.security.RolesAllowed;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.FormParam;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.NotAcceptableException;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.List;

@Path("/modelos")
@PermitAll
public class Modelos {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({"CLI","ADM"})
    public List<Modelo> getModelos() {
        return Service.instance().cargarModelos();
    }

    @POST
    @Path("/register")
    @Consumes(MediaType.APPLICATION_JSON)
    @RolesAllowed({"ADM"})
    public Response agregarModelo(Modelo modelo) {
        try {
            Service.instance().agregarModelo(modelo);
            return Response.status(Response.Status.CREATED).build();
        } catch (Exception e) {
            // Handle the exception appropriately (e.g., log the error, return an error response)
            // You can customize the error handling based on your application's requirements
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
    }

    

    public static final String location = "C:/AAA/seguros/";

    @POST
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Path("{id}/carro")
    @RolesAllowed({"ADM"})
    public void createImage(@PathParam("id") int id, @FormParam("carro") InputStream in) {
        try (
                OutputStream out = new FileOutputStream(new File(location + id + ".png"))) {
            in.transferTo(out);
            out.close();
        } catch (Exception ex) {
            throw new NotAcceptableException();
        }
    }
    
    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({"CLI","ADM"})
    public Modelo getModeloById(@PathParam("id") int modeloId) {
        try {
            return Service.instance().cargarModeloById(modeloId);
        } catch (Exception e) {
            // Handle the exception appropriately (e.g., log the error, return an error response)
            // You can customize the error handling based on your application's requirements
            return null;
        }
    }

    @GET
    @Path("{id}/carro")
    @RolesAllowed({"CLI","ADM"})
    public Response readImage(@PathParam("id") int id) {
        File file = new File(location + id + ".png");
        return Response.ok(file, MediaType.APPLICATION_OCTET_STREAM)
                .header("Content-Disposition", "attachment; filename=\"carro.png\"")
                .build();
    }

    @GET
    @Path("/last")
    @RolesAllowed({"ADM"})
    @Produces(MediaType.APPLICATION_JSON)
    public Modelo getLastModelo() throws Exception {
        return Service.instance().cargarUltimoModelo();
    }

}
