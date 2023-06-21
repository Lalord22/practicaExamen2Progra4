/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.progra.countries.logic;


import com.progra.guia.data.MarcaDao;
import com.progra.guia.data.ModeloDao;

import com.progra.guia.data.RelDatabase;
import com.progra.guia.data.UsuarioDao;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;
import java.sql.SQLException;
import java.text.DecimalFormat;

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

    RelDatabase relDatabase;
    UsuarioDao usuarioDao;
    ModeloDao modeloDao;
    MarcaDao marcaDao;

   private List<Usuario> usuarios;

private Service() {
    relDatabase = new RelDatabase();
    usuarioDao = new UsuarioDao(relDatabase);
   
    modeloDao = new ModeloDao(relDatabase);
    marcaDao = new MarcaDao(relDatabase);
    
    usuarios = new ArrayList<>(); // Initialize the usuarios list
   // preguntas = new ArrayList<>(); // Initialize the preguntas list
    
    Usuario usuario = new Usuario("111","12345678",0);
    
    // Add the usuario object to the usuarios list
    usuarios.add(usuario);
}


    

   

    public Usuario usuarioFind(String cedula, String clave) throws Exception {  //implementado
        Usuario usuario = usuarioDao.read(cedula, clave);
        return usuario;
    }
    
   public Usuario usuarioFindById(String cedula) throws Exception {
    for (Usuario usuario : usuarios) {
        if (usuario.getCedula().equals(cedula)) {
            return usuario;
        }
    }
    throw new Exception("Usuario not found for cedula: " + cedula);
}

    

    

    

    public void usuarioUpdate(Usuario usuario) throws Exception {    // implementado
        usuarioDao.update(usuario);
    }

    

    public void registerUser(Usuario u) throws Exception {         //implementado
        usuarioDao.addUser(u);
    }

    public List<Modelo> cargarModelos() {          //implementado

        return modeloDao.cargarTodo();

    }

    public List<Marca> cargarMarcas() {      //implementado

        return marcaDao.cargarTodo();

    }

    public Marca cargarMarcaById(Integer id) throws Exception {           //implementado
        return marcaDao.read(id);
    }
   

    public void agregarModelo(Modelo u) throws Exception {    //implementado**
        modeloDao.addModelo(u);
    }

    public void agregarMarca(Marca u) throws Exception {    //implementado
        marcaDao.addMarca(u);
    }

    
    public Modelo cargarModeloById(int modeloId) throws Exception {   //implementado

        return this.modeloDao.read(modeloId);

    }

  
   

   

    }

    

   
    
