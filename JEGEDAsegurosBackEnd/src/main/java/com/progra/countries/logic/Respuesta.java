/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.progra.countries.logic;

/**
 *
 * @author lalo2
 */
public class Respuesta {
    int id;
    String respuesta;

    public Respuesta() {
    }

    Respuesta(int id, String respuesta) {
        this.id = id;
        this.respuesta = respuesta;
    }

    

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getRespuesta() {
        return respuesta;
    }

    public void setRespuesta(String respuesta) {
        this.respuesta = respuesta;
    }
}
