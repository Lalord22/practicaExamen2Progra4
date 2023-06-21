/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.progra.countries.logic;

import java.util.List;

/**
 *
 * @author lalo2
 */
public class Pregunta {

    private String pregunta;
    private String respuesta1;
    private String respuesta2;
    private String respuesta3;
    private String topic;    
    private String respuestaCorrecta;
    private boolean respuestaContestada;

    public Pregunta(String pregunta, String topic, String respuesta1, String respuesta2, String respuesta3, String respuestaCorrecta) {
        this.pregunta = pregunta;
        this.topic = topic;
        this.respuesta1 = respuesta1;
        this.respuesta2 = respuesta2;
        this.respuesta3 = respuesta3;
        this.respuestaCorrecta = respuestaCorrecta;
        this.respuestaContestada = false;
    }
    
    public boolean contestarPregunta(String respuesta){
        this.respuestaContestada = true;
        return respuesta == this.respuestaCorrecta;
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

    public String getRespuestaCorrecta() {
        return respuestaCorrecta;
    }

    public void setRespuestaCorrecta(String respuestaCorrecta) {
        this.respuestaCorrecta = respuestaCorrecta;
    }

}
