/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.progra.countries.logic;

import java.util.ArrayList;

import java.util.List;


/**
 *
 * @author Escinf
 */
public class Service {

    private static Service uniqueInstance;

    public static Service instance() {
        if (uniqueInstance == null) {
            uniqueInstance = new Service();
        }
        return uniqueInstance;
    }

    private List<Usuario> usuarios;
    private List<Pregunta> preguntas;
    private List<Respuesta> respuestas;

    private Service() {

        usuarios = new ArrayList<>(); // Initialize the usuarios list
        preguntas = new ArrayList<>(); // Initialize the preguntas list
        respuestas = new ArrayList<>();

        Usuario usuario1 = new Usuario("111", "12345678", 0);
        Pregunta pregunta1 = new Pregunta(1,"Not Object Oriented?", "Prog, Lang", "C++", "C", "Java");
        Pregunta pregunta2 = new Pregunta(2,"What is java?", "Prog, Lang", "Language", "Class", "Pattern");
        Pregunta pregunta3 = new Pregunta(3,"What is Integer", "Prog, Data", "Language", "Data Type", "Number");

        Respuesta respuesta1 = new Respuesta(1, "C");
        Respuesta respuesta2 = new Respuesta(2, "Language");
        Respuesta respuesta3 = new Respuesta(3, "Data Type");
        
        // Add the usuario object to the usuarios list
        usuarios.add(usuario1);
        preguntas.add(pregunta1);
        preguntas.add(pregunta2);
        preguntas.add(pregunta3);
    }

    public Usuario usuarioFindById(String cedula) throws Exception {
        for (Usuario usuario : usuarios) {
            if (usuario.getCedula().equals(cedula)) {
                return usuario;
            }
        }
        throw new Exception("Usuario not found for cedula: " + cedula);
    }

    public List<Pregunta> cargarPreguntas() {
        return preguntas;
    }

    public List<Pregunta> retornaPreguntasPorTopic(String topic) {
        List<Pregunta> filteredPreguntas = new ArrayList<>();

        for (Pregunta pregunta : preguntas) {
            if (pregunta.getTopic().contains(topic)) {
                filteredPreguntas.add(pregunta);
            }
        }

        return filteredPreguntas;
    }

    public boolean revisarRespuesta(Pregunta pregunta, String respuesta) {
    int preguntaId = pregunta.getId();

    // Find the corresponding respuesta object based on pregunta ID
    Respuesta correctRespuesta = null;
    for (Respuesta resp : respuestas) {
        if (resp.getId() == preguntaId) {
            correctRespuesta = resp;
            break;
        }
    }

    if (correctRespuesta != null) {
        // Compare the given respuesta with the correct respuesta
        return respuesta.equals(correctRespuesta.getRespuesta());
    }

    return false; // Pregunta ID not found in respuestas array
}


}
