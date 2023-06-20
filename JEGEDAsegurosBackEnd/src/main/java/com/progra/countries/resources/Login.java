/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.progra.countries.resources;

import com.progra.countries.logic.Service;
import com.progra.countries.logic.Usuario;
import jakarta.annotation.security.PermitAll;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.NotFoundException;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;

/**
 *
 * @author lalo2
 */
@Path("/login")
@PermitAll
public class Login {
    @Context
    HttpServletRequest request;
    
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Usuario login(Usuario user){
        Usuario logged = null;
        try{
            logged = Service.instance().usuarioFindById(user.getCedula());
            if(!logged.getClave().equals(user.getClave())) throw new Exception("Wrong password");
            request.getSession(true).setAttribute("user",logged);
            return logged;
        } catch (Exception ex){
            throw new NotFoundException();
        }
    }
    
    @DELETE
    public void logout(){
        HttpSession session = request.getSession(true);
        session.removeAttribute("user");
        session.invalidate();
    }
    
}
