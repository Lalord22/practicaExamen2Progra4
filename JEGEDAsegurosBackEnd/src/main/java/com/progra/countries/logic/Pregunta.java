/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.progra.countries.logic;

import java.util.List;
import java.util.Random;

/**
 *
 * @author lalo2
 */
public class Pregunta {

    int id;
    private String pregunta;
    private String respuesta1;
    private String respuesta2;
    private String respuesta3;
    private String topic;    
    private boolean respuestaContestada;

    public Pregunta(int id,String pregunta, String topic, String respuesta1, String respuesta2, String respuesta3) {
       
        this.id =id;
        this.pregunta = pregunta;
        this.topic = topic;
        this.respuesta1 = respuesta1;
        this.respuesta2 = respuesta2;
        this.respuesta3 = respuesta3;
      
        this.respuestaContestada = false;
    }
    
    public Pregunta(){
    Random random = new Random();
    this.id = random.nextInt(5000);
    this.respuestaContestada = false;
    }
    
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
    
    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public boolean isRespuestaContestada() {
        return respuestaContestada;
    }

    public void setRespuestaContestada(boolean respuestaContestada) {
        this.respuestaContestada = respuestaContestada;
    }

    public String getPregunta() {
        return pregunta;
    }

    public void setPregunta(String pregunta) {
        this.pregunta = pregunta;
    }

    public String getRespuesta1() {
        return respuesta1;
    }

    public void setRespuesta1(String respuesta1) {
        this.respuesta1 = respuesta1;
    }

    public String getRespuesta2() {
        return respuesta2;
    }

    public void setRespuesta2(String respuesta2) {
        this.respuesta2 = respuesta2;
    }

    public String getRespuesta3() {
        return respuesta3;
    }

    public void setRespuesta3(String respuesta3) {
        this.respuesta3 = respuesta3;
    }

   

}
