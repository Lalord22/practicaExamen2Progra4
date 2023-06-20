/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.progra.guia.data;

import com.progra.countries.logic.Marca;
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


public class MarcaDao {
    
    RelDatabase db;

    public MarcaDao(RelDatabase db){
        this.db= db;
    }
    
    public void addMarca(Marca m) throws Exception {
        String query = "INSERT INTO Marca (descripcion) VALUES (?)";
        PreparedStatement statement = db.prepareStatement(query);
        statement.setString(1, m.getDescripcion());
        db.executeUpdate(statement); 
    
  }
    
    
    public Marca read(Integer id) throws Exception {
        String sql = "select " +
                "* " +
                "from  Marca e " +
                "where e.id=?";
        PreparedStatement stm = db.prepareStatement(sql);
        stm.setInt(1, id);
        ResultSet rs = db.executeQuery(stm);
        if (rs.next()) {
            return from(rs, "e");
        } else {
            throw new Exception("Marca no Existe");
        }
    }
    
    public Marca from(ResultSet rs, String alias) {
        try {
            Marca e = new Marca(0,"");
            e.setId(rs.getInt(alias + ".id"));
            e.setDescripcion(rs.getString(alias + ".descripcion"));            
            return e;
        } catch (SQLException ex) {
            return null;
        }
    } 
    
      public void update(Marca e) throws Exception {
        String sql = "UPDATE Marca SET descripcion WHERE id=?";
        PreparedStatement stm = db.prepareStatement(sql);
        stm.setInt(1, e.getId());
        int count = db.executeUpdate(stm);
        if (count == 0) {
            throw new Exception("Marca no existe");
        }
    } 
      
       public List<Marca> cargarTodo() { 
        List<Marca> resultado = new ArrayList<>();
        try {
            String sql = "SELECT * FROM Marca";
            PreparedStatement stm = db.prepareStatement(sql);
            ResultSet rs = db.executeQuery(stm);
            while (rs.next()) {
                resultado.add(from1(rs));
            }
        } catch (SQLException ex) {
            // Handle the exception
        }
        return resultado;
        }
       
       public Marca from1(ResultSet rs) {
        try {
            Marca marca = new Marca(0,"");
            
            marca.setId(rs.getInt("id"));
            marca.setDescripcion(rs.getString( "descripcion"));

            return marca;
        } catch (SQLException ex) {
            return null;
        }
    }  
    
}
