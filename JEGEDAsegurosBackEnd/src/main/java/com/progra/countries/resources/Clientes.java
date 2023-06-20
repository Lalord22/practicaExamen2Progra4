package com.progra.countries.resources;
import com.progra.countries.logic.Cliente;
import com.progra.countries.logic.Service;
import com.progra.countries.logic.Usuario;
import jakarta.annotation.security.PermitAll;
import jakarta.annotation.security.RolesAllowed;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.NotAuthorizedException;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import java.util.List;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.Response;

@Path("/clientes")
@PermitAll
public class Clientes {
    
    @GET
@Path("/cliente")
@Produces(MediaType.APPLICATION_JSON)
@RolesAllowed({"CLI","ADM"})
public Cliente clienteFind(@Context HttpServletRequest request) throws Exception {
    Usuario loggedUser = (Usuario) request.getSession().getAttribute("user");
    if (loggedUser == null) {
        throw new NotAuthorizedException("User not logged in");
    }
    
    String cedula = loggedUser.getCedula();
    String clave = loggedUser.getClave();

    Usuario usuario = new Usuario(cedula, clave);
    Cliente cliente = Service.instance().clienteFind(usuario);
    return cliente;
}


    @PUT
    @Path("/update")
    @Consumes(MediaType.APPLICATION_JSON)
    @RolesAllowed({"CLI","ADM"})
    public Response updateCliente(Cliente cliente) {
        try {
            Service.instance().clienteUpdate(cliente);
            return Response.ok().build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
        }
    }

    @POST
    @Path("/register")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response registerCliente(Cliente cliente) {
        try {
            Service.instance().registerCliente(cliente);
            return Response.ok().build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
        }
    }

    @GET
    @Path("/coberturas")
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({"CLI","ADM"})
    public List<Cliente> getCoberturas() {
        return Service.instance().cargarClientes();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({"CLI","ADM"})
    public List<Cliente> getClientes() {
        return Service.instance().cargarClientes();
    }
    
}
