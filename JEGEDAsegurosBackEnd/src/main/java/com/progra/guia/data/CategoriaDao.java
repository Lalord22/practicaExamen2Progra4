/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.progra.guia.data;

import com.progra.countries.logic.Categoria;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/*
 *Proyecto I Programacion 4
 * 
 *Jennifer Lobo Vasquez
 *Daniela Madrigal Morales
 *Gerardo Salzar Vargas
 * 
 */

public class CategoriaDao {
    RelDatabase db;

    public CategoriaDao(RelDatabase db) {
        this.db = db;
    }
    
    public void addCategoria(Categoria u) throws Exception {
    String query = "INSERT INTO Categoria( descripcion) VALUES (?)";
    PreparedStatement statement = db.prepareStatement(query);
    String id = Integer.toString(u.getId());
    statement.setString(1, u.getDescripcion());
    db.executeUpdate(statement); 
    
  }
    
  public Categoria read(Integer id) throws Exception {
        String sql = "select " +
                "* " +
                "from  Categoria e " +
                "where e.id=?";
        PreparedStatement stm = db.prepareStatement(sql);
        stm.setInt(1, id);
        ResultSet rs = db.executeQuery(stm);
        if (rs.next()) {
            return from(rs, "e");
        } else {
            throw new Exception("Categoria no Existe");
        }
    }
    
    public Categoria from(ResultSet rs, String alias) {
        try {
            Categoria e = new Categoria();
            e.setId(rs.getInt(alias + ".id"));
            e.setDescripcion(rs.getString(alias + ".descripcion"));         
            return e;
        } catch (SQLException ex) {
            return null;
        }
    } 
    
      public void update(Categoria e) throws Exception {
        String sql = "UPDATE Categoria SET id=?, descripcion=? WHERE id=?";
        PreparedStatement stm = db.prepareStatement(sql);
        stm.setInt(1, e.getId());
        stm.setString(2, e.getDescripcion());
        int count = db.executeUpdate(stm);
        if (count == 0) {
            throw new Exception("Categoria no existe");
        }
    } 

    public List<Categoria> cargarTodo() {
        List<Categoria> resultado = new ArrayList<>();
    try {
        String sql = "SELECT * FROM Categoria";
        PreparedStatement stm = db.prepareStatement(sql);
        
        ResultSet rs = db.executeQuery(stm);
        while (rs.next()) {
            
            
            resultado.add(from(rs));
        }
    } catch (SQLException ex) {
        // Handle the exception
    }
    return resultado;

        
    }
    
    public Categoria from(ResultSet rs) {
        try {
            Categoria cate = new Categoria(0,"");
            
            cate.setId(rs.getInt("id"));
            cate.setDescripcion(rs.getString( "descripcion"));

            return cate;
        } catch (SQLException ex) {
            return null;
        }
    }  
        
    
}
