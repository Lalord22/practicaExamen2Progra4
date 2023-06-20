/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.progra.guia.data;

import com.progra.countries.logic.Modelo;
import com.progra.countries.logic.Marca;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
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
public class ModeloDao {

    RelDatabase db;

    public ModeloDao(RelDatabase db) {
        this.db = db;
    }

    public Modelo read(Integer id) throws Exception {
        String sql = "SELECT "
                + "e.*, "
                + "u.* "
                + "FROM Modelo e "
                + "INNER JOIN Marca u ON e.marca_id = u.id "
                + "WHERE e.id = ?";

        PreparedStatement stm = db.prepareStatement(sql);
        stm.setInt(1, id);
        ResultSet rs = db.executeQuery(stm);
        MarcaDao marcaDao = new MarcaDao(db);
        Modelo c;
        if (rs.next()) {
            c = from(rs, "e");
            c.setMarca(marcaDao.from(rs, "u"));
            return c;
        } else {
            throw new Exception("Cliente no Existe");
        }
    }

    public Modelo from(ResultSet rs, String alias) {
        try {
            Modelo e = new Modelo(0, "", new Marca(0, ""));
            e.setId(rs.getInt(alias + ".id"));
            e.setDescripcion(rs.getString(alias + ".descripcion"));

            return e;
        } catch (SQLException ex) {
            return null;
        }
    }

    public void update(Modelo e) throws Exception {
        String sql = "UPDATE Modelo SET descripcion=? WHERE id=?";
        PreparedStatement stm = db.prepareStatement(sql);
        stm.setString(1, e.getDescripcion());
        int count = db.executeUpdate(stm);
        if (count == 0) {
            throw new Exception("Modelo no existe");
        }
    }

    public void addModelo(Modelo u) throws Exception {
        String query = "INSERT INTO Modelo (descripcion, marca_id) VALUES (?, ?)";
        Connection conn = db.getConnection();
        PreparedStatement statement = conn.prepareStatement(query, Statement.RETURN_GENERATED_KEYS);
        statement.setString(1, u.getDescripcion());
        statement.setInt(2, u.getMarca().getId());
        statement.executeUpdate();
        ResultSet rs = statement.getGeneratedKeys();
        if (rs.next()) {
            int id = rs.getInt(1);
            u.setId(id);
        }
        rs.close();
        statement.close();
        conn.close();
    }

    public Modelo from(ResultSet rs) {
        try {
            Marca marca = new Marca(0, "");

            Modelo modelo = new Modelo(0, "", marca);
            modelo.setId(rs.getInt("id"));
            modelo.setDescripcion(rs.getString("descripcion"));
            modelo.setMarca(marca);
            return modelo;
        } catch (SQLException ex) {
            return null;
        }
    }

    public List<Modelo> cargarTodo() {
        List<Modelo> resultado = new ArrayList<>();
        try {
            String sql = "SELECT * FROM Modelo JOIN Marca ON Modelo.marca_id = Marca.id";
            PreparedStatement stm = db.prepareStatement(sql);
            ResultSet rs = db.executeQuery(stm);
            while (rs.next()) {
                Marca marca = new Marca(0, "");
                marca.setId(rs.getInt("Marca.id"));
                marca.setDescripcion(rs.getString("marca.descripcion"));

                marca.setDescripcion(rs.getString("Marca.descripcion"));

                Modelo modelo = new Modelo(0, "", null);
                modelo.setId(rs.getInt("Modelo.id"));
                modelo.setDescripcion(rs.getString("Modelo.descripcion"));
                modelo.setMarca(marca);

                resultado.add(modelo);
            }
        } catch (SQLException ex) {
            // Handle the exception
        }
        return resultado;
    }

    public Modelo getLastModelo() throws Exception {
        String sql = "SELECT * FROM Modelo e INNER JOIN Marca u ON e.marca_id = u.id WHERE e.id = (SELECT MAX(id) FROM Modelo)";
        PreparedStatement stm = db.prepareStatement(sql);
        ResultSet rs = db.executeQuery(stm);
        MarcaDao marcaDao = new MarcaDao(db);
        if (rs.next()) {
            Modelo c = from(rs, "e");
            c.setMarca(marcaDao.from(rs, "u"));
            return c;
        } else {
            throw new Exception("Modelo does not exist");
        }
    }

}
