/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.progra.countries.logic;

import jakarta.json.bind.annotation.JsonbTransient;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/*
 *Proyecto I Programacion 4
 * 
 *Jennifer Lobo Vasquez
 *Daniela Madrigal Morales
 *Gerardo Salzar Vargas
 * 
 */


public class Cliente implements Serializable {
    String cedula;
    String nombre;
    String telefono;
    String correo;
    String datosTarjeta;
    Usuario usuario;
    List<Poliza> polizas;

    public Cliente() {
        this("", "", "", "", "", new Usuario());
    }

    public Cliente(String cedula, String nombre, String telefono, String correo, String datosTarjeta, Usuario usuario) {
        this.cedula = cedula;
        this.nombre = nombre;
        this.usuario = usuario;
        this.telefono = telefono;
        this.correo = correo;
        this.datosTarjeta = datosTarjeta;
        this.polizas = new ArrayList<>();
    }

    public String getCedula() {
        return cedula;
    }

    public void setCedula(String cedula) {
        this.cedula = cedula;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    @JsonbTransient
    public List<Poliza> getPolizas() {
        return polizas;
    }
    
    @JsonbTransient
    public void setPolizas(List<Poliza> polizas) {
        this.polizas = polizas;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getDatosTarjeta() {
        return datosTarjeta;
    }

    public void setDatosTarjeta(String datosTarjeta) {
        this.datosTarjeta = datosTarjeta;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null || getClass() != obj.getClass()) {
            return false;
        }
        Cliente cliente = (Cliente) obj;
        return Objects.equals(cedula, cliente.cedula);
    }
}
