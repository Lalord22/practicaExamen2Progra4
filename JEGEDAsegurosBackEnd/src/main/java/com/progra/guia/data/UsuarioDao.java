/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.progra.guia.data;

import com.progra.countries.logic.Usuario;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;


/*
 *Proyecto I Programacion 4
 * 
 *Jennifer Lobo Vasquez
 *Daniela Madrigal Morales
 *Gerardo Salzar Vargas
 * 
 */


public class UsuarioDao {
    RelDatabase db;

    public UsuarioDao(RelDatabase db){
        this.db= db;
    }
    
    public void addUser(Usuario u) throws Exception {
    String query = "INSERT INTO Usuario (cedula, clave, tipo) VALUES (?, ?, ?)";
    PreparedStatement statement = db.prepareStatement(query);
    statement.setString(1, u.getCedula());
    statement.setString(2, u.getClave());
    statement.setInt(3, u.getTipo());
    db.executeUpdate(statement); 
    
  }
    
    
    public Usuario read(String cedula, String clave) throws Exception {
       String sql = "select " +
        "* " +
        "from  Usuario e " +
        "where e.cedula=? and e.clave=?";
        PreparedStatement stm = db.prepareStatement(sql);
        stm.setString(1, cedula);
         stm.setString(2, clave);
        ResultSet rs = db.executeQuery(stm);
        if (rs.next()) {
            return from(rs, "e");
        } else {
            throw new Exception("Usuario no Existe");
        }
    }
    
    public Usuario readById(String cedula) throws Exception {
       String sql = "select " +
        "* " +
        "from  Usuario e " +
        "where e.cedula=?";
        PreparedStatement stm = db.prepareStatement(sql);
        stm.setString(1, cedula);
        ResultSet rs = db.executeQuery(stm);
        if (rs.next()) {
            return from(rs, "e");
        } else {
            throw new Exception("Usuario no Existe");
        }
    }
    
    public Usuario from(ResultSet rs, String alias) {
        try {
            Usuario e = new Usuario();
            e.setCedula(rs.getString(alias + ".cedula"));
            e.setClave(rs.getString(alias + ".clave"));
            e.setTipo(rs.getInt(alias + ".tipo"));            
            return e;
        } catch (SQLException ex) {
            return null;
        }
    } 
    
      public void update(Usuario e) throws Exception {
        String sql = "UPDATE Usuario SET cedula=?, clave=?, tipo=? WHERE cedula=?";
        PreparedStatement stm = db.prepareStatement(sql);
        stm.setString(1, e.getCedula());
        stm.setString(2, e.getClave());
        stm.setInt(3, e.getTipo());
         stm.setString(4, e.getCedula());
        int count = db.executeUpdate(stm);
        if (count == 0) {
            throw new Exception("Cliente no existe");
        }
    } 
 }
