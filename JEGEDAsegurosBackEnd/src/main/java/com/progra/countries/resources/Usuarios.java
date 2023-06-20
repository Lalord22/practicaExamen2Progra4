package com.progra.countries.resources;
import jakarta.annotation.security.PermitAll;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import java.util.List;
import com.progra.countries.logic.Service;
import com.progra.countries.logic.Usuario;
import jakarta.annotation.security.RolesAllowed;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.NotFoundException;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.core.Response;

@Path("/usuarios")
@PermitAll
public class Usuarios {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({"ADM"})
    public List<Usuario> getAllUsuarios() {
        Service service = Service.instance();
        // Assuming the Service class has a method to retrieve all usuarios
        return service.getAllUsuarios();
    }

    @GET
    @Path("/{cedula}/{clave}")
    @Produces({MediaType.APPLICATION_JSON})
    @RolesAllowed({"ADM"})
    public Usuario getUsuario(@PathParam("cedula") String cedula, @PathParam("clave") String clave) throws Exception {
        try {
            return Service.instance().usuarioFind(cedula, clave);
        } catch (Exception ex) {
            throw new NotFoundException();
        }

    }

    @PUT
    @Path("/update")
    @Consumes(MediaType.APPLICATION_JSON)
    @RolesAllowed({"CLI","ADM"})
    public Response updateUsuario(Usuario usuario) {             //Testeado, hk
        try {
            Service.instance().usuarioUpdate(usuario);
            return Response.ok().build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
        }
    }

    @POST
    @Path("/register")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response registerUser(Usuario usuario) {
        try {
            Service.instance().registerUser(usuario);
            return Response.ok().build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
        }
    }


}



