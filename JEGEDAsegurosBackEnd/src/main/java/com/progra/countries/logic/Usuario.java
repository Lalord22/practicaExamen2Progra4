package com.progra.countries.logic;

import java.util.Objects;

/*
 *Proyecto I Programacion 4
 * 
 *Jennifer Lobo Vasquez
 *Daniela Madrigal Morales
 *Gerardo Salzar Vargas
 * 
 */


public class Usuario  implements java.io.Serializable {


     private String cedula;
     private String clave;
     private Integer tipo;


    public Usuario() {
        this.cedula = null;
        this.clave = null;
        this.tipo = 0;
    }

	
    public Usuario(String cedula) {
        this.cedula = cedula;
    }
    public Usuario(String cedula, String clave, Integer tipo) {
       this.cedula = cedula;
       this.clave = clave;
       this.tipo = tipo;
    }

    public Usuario(String username, String password) {
        this.cedula= username;
        this.clave = password;
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


