package com.progra.countries.logic;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;




public class Usuario  implements java.io.Serializable {


     private String cedula;
     private String clave;
     private Integer tipo;
     private List<Respuesta> IdsDeRespuestasContestadas;


    public Usuario() {
        this.cedula = null;
        this.clave = null;
        this.tipo = 0;
        this.IdsDeRespuestasContestadas = new ArrayList<>();
    }

    public List<Respuesta> getIdsDeRespuestasContestadas() {
        return IdsDeRespuestasContestadas;
    }

    public void setIdsDeRespuestasContestadas(List<Respuesta> IdsDeRespuestasContestadas) {
        this.IdsDeRespuestasContestadas = IdsDeRespuestasContestadas;
    }

	
    public Usuario(String cedula) {
        this.cedula = cedula;
         this.IdsDeRespuestasContestadas = new ArrayList<>();
    }
    public Usuario(String cedula, String clave, Integer tipo) {
       this.cedula = cedula;
       this.clave = clave;
       this.tipo = tipo;
        this.IdsDeRespuestasContestadas = new ArrayList<>();
    }

    public Usuario(String username, String password) {
        this.cedula= username;
        this.clave = password;
         this.IdsDeRespuestasContestadas = new ArrayList<>();
    }
   
    public String getCedula() {
        return this.cedula;
    }
    
    public void setCedula(String cedula) {
        this.cedula = cedula;
    }
    public String getClave() {
        return this.clave;
    }
    
    public void setClave(String clave) {
        this.clave = clave;
    }
    public Integer getTipo() {
        return this.tipo;
    }
    
    public void setTipo(Integer tipo) {
        this.tipo = tipo;
    }


    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Usuario other = (Usuario) obj;
        if (!Objects.equals(this.cedula, other.cedula)) {
            return false;
        }
        return true;
    }

    public String getUsername() {
        return this.cedula;
    }

    public String getRol(){
        if(this.tipo==2)
            return "ADM";
        else
            return "CLI";
    }
    
    
    

}


