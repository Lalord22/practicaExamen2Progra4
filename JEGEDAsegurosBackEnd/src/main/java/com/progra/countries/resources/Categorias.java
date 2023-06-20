package com.progra.countries.resources;
import com.progra.countries.logic.Categoria;
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

@Path("/categorias")
@PermitAll
public class Categorias {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({"ADM", "CLI"})
    public List<Categoria> getCategorias() {
        return Service.instance().cargarCategorias();
    }

    @POST
    @Path("/register")
    @Consumes(MediaType.APPLICATION_JSON)
    @RolesAllowed({"ADM"})
    public Response addCategoria(Categoria cate) {
        try {
            Service.instance().agregaCategoria(cate);
            return Response.ok().build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
        }
    }

    @GET
    @Path("/{id}")
    @RolesAllowed({"ADM", "CLI"})
    @Produces(MediaType.APPLICATION_JSON)
    public Categoria categoriaShowById(@PathParam("id") Integer id) {
        try {
            return Service.instance().cargarCategoriaById(id);
        } catch (Exception e) {
            e.printStackTrace();
            // Handle the exception and return an error response
            // or throw a custom exception based on your application's requirements
            return null; // or throw a custom exception here
        }
    }

}
