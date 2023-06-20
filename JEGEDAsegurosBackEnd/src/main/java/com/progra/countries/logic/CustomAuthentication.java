package com.progra.countries.logic;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.security.enterprise.AuthenticationStatus;
import jakarta.security.enterprise.authentication.mechanism.http.HttpAuthenticationMechanism;
import jakarta.security.enterprise.authentication.mechanism.http.HttpMessageContext;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.security.Principal;
import java.util.Arrays;
import java.util.HashSet;

@ApplicationScoped
public class CustomAuthentication implements HttpAuthenticationMechanism {

    @Override
    public AuthenticationStatus validateRequest(HttpServletRequest request, HttpServletResponse response,
                                               HttpMessageContext httpMsgContext) {
        Usuario user = (Usuario) request.getSession().getAttribute("user");
        if (user != null) {
            return httpMsgContext.notifyContainerAboutLogin(new Principal() {@Override public String getName(){return user.getCedula();}},
                    new HashSet<>(Arrays.asList(new String[]{user.getRol()})));
                }
        else{
            return httpMsgContext.notifyContainerAboutLogin(new Principal() {@Override public String getName(){return "none";}},
                    new HashSet<>());
        
        }
          
    }
}
