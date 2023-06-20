/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.progra.guia.data;

import com.progra.countries.logic.Cliente;
import com.progra.countries.logic.Cobertura;
import com.progra.countries.logic.Marca;
import com.progra.countries.logic.Modelo;
import com.progra.countries.logic.Poliza;
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


public class PolizaDao {
    RelDatabase db;

    public PolizaDao(RelDatabase db){
        this.db= db;
    }
    public Poliza read(Integer id) throws Exception {
        String sql = "select * from Poliza e inner join Cliente c on e.cliente = c.cedula inner join Modelo m on e.modelo = m.id where e.id = ?";
        PreparedStatement stm = db.prepareStatement(sql);
        stm.setInt(1, id);
        ResultSet rs = db.executeQuery(stm);
        ClienteDao clienteDao = new ClienteDao(db);
        ModeloDao modeloDao = new ModeloDao(db);
        Poliza c;
        if (rs.next()) {
            c = from(rs);
            c.setCliente(clienteDao.from(rs, "c"));
            c.setModelo(modeloDao.from(rs,"m"));
            return c;
        } else {
            throw new Exception("Poliza no Existe");
        }
    }

    public List<Poliza> findByCliente(Cliente cliente) {
    List<Poliza> resultado = new ArrayList<>();
    try {
        String sql = "SELECT Poliza.*, Modelo.*, Marca.* " +
                     "FROM Poliza " +
                     "JOIN Modelo ON Poliza.modelo = Modelo.id " +
                     "JOIN Marca ON Modelo.marca_id = Marca.id " +
                     "WHERE cliente = ?";
        PreparedStatement stm = db.prepareStatement(sql);
        stm.setString(1, cliente.getCedula());
        ResultSet rs = db.executeQuery(stm);
        while (rs.next()) {
            Marca marca = new Marca(rs.getInt("marca_id"),rs.getString("Marca.descripcion"));
            Modelo modelo = new Modelo(rs.getInt("modelo.id"),rs.getString("Modelo.descripcion"), marca);
            Poliza poliza = new Poliza(rs.getInt("Poliza.id"),rs.getString("numeroPlaca"),rs.getString("anno"),rs.getDouble("valorAsegurado"),rs.getString("plazoPago"),rs.getString("fechaInicio"),  modelo,cliente);
            resultado.add(poliza);
        }
    } catch (SQLException ex) {
        // Handle the exception
    }
    return resultado;
}

    
    
    
    public List<Poliza> findByPlaca(String placa) {
    List<Poliza> resultado = new ArrayList<>();
    try {
        String sql = "SELECT * FROM Poliza WHERE numeroPlaca = ?";
        if (placa != null && !placa.isEmpty()) {
            sql = "SELECT * FROM Poliza WHERE numeroPlaca = '" + placa + "'";
        }
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



    
       public List<Poliza> findByModelo(Modelo modelo) {
        List<Poliza> resultado = new ArrayList<>();
        try {
            String sql = "select * " +
                    "from " +
                    "Poliza e " +
                    "where e.modelo=?";
            PreparedStatement stm = db.prepareStatement(sql);
            stm.setInt(1, modelo.getId());
            ResultSet rs = db.executeQuery(stm);
            while (rs.next()) {
                resultado.add(from(rs));
            }
        } catch (SQLException ex) {
        }
        return resultado;
    }
    
      private Poliza from(ResultSet rs) throws SQLException {
    Poliza poliza = new Poliza();
    poliza.setId(rs.getInt("id"));
    poliza.setNumeroPlaca(rs.getString("numeroPlaca"));
    poliza.setAnno(rs.getString("anno"));
    poliza.setValorAsegurado(rs.getDouble("valorAsegurado"));
    poliza.setPlazoPago(rs.getString("plazoPago"));
    poliza.setFechaInicio(rs.getString("fechaInicio"));

    int modeloId = rs.getInt("modelo");
    int marcaId = 0;
    Modelo modelo = null;
    Marca marca = null;
    try {
        String sqlModelo = "SELECT * FROM Modelo WHERE id = ?";
        PreparedStatement stmModelo = db.prepareStatement(sqlModelo);
        stmModelo.setInt(1, modeloId);
        ResultSet rsModelo = db.executeQuery(stmModelo);
        if (rsModelo.next()) {
            marcaId = rsModelo.getInt("marca");
            modelo = new Modelo(modeloId, rsModelo.getString("descripcion"), null);
        }
    } catch (SQLException ex) {
        // Handle the exception
    }

    if (modelo != null) {
        try {
            String sqlMarca = "SELECT * FROM Marca WHERE id = ?";
            PreparedStatement stmMarca = db.prepareStatement(sqlMarca);
            stmMarca.setInt(1, marcaId);
            ResultSet rsMarca = db.executeQuery(stmMarca);
            if (rsMarca.next()) {
                marca = new Marca(marcaId, rsMarca.getString("descripcion"));
            }
        } catch (SQLException ex) {
            // Handle the exception
        }
        modelo.setMarca(marca);
        poliza.setModelo(modelo);
    }

    return poliza;
}

      public List<Poliza> findByCedula(String cedula) {
        List<Poliza> resultado = new ArrayList<>();
        try {
            String sql = "SELECT * FROM Poliza WHERE cliente = ?";
            PreparedStatement stm = db.prepareStatement(sql);
            stm.setString(1, cedula);
            ResultSet rs = stm.executeQuery();
            while (rs.next()) {
                resultado.add(from(rs));
            }
        } catch (SQLException ex) {
            // Handle the exception
        }
        return resultado;
}

    public void addPoliza(Poliza poliza) throws SQLException {
    String sql = "INSERT INTO Poliza (numeroPlaca, anno, valorAsegurado, plazoPago, fechaInicio, modelo, cliente) VALUES (?, ?, ?, ?, ?, ?, ?)";
    PreparedStatement stm = db.prepareStatement(sql);
    stm.setString(1, poliza.getNumeroPlaca());
    stm.setString(2, poliza.getAnno());
    stm.setDouble(3, poliza.getValorAsegurado());
    stm.setString(4, poliza.getPlazoPago());
    stm.setString(5, poliza.getFechaInicio());
    stm.setInt(6, poliza.getModelo().getId());
    stm.setString(7, poliza.getCliente().getCedula());
    stm.executeUpdate();
}

    public void insertCoberturas(Poliza poliza) throws SQLException {
    int polizaId = poliza.getId();
    for (Cobertura cobertura : poliza.getCoberturas()) {
        int coberturaId = cobertura.getId();
        
        String sql = "INSERT INTO Poliza_Cobertura (poliza, cobertura) VALUES (?, ?)";
        PreparedStatement stm = db.prepareStatement(sql);
        
        // Set the values for the parameters
        stm.setInt(1, polizaId);
        stm.setInt(2, coberturaId);
        
        // Execute the statement
        stm.executeUpdate();
    }
    
}

public int getPolizaWithHighestId() throws SQLException, Exception {
    String sql = "SELECT id FROM Poliza ORDER BY id DESC LIMIT 1";
    PreparedStatement stm = db.prepareStatement(sql);
    ResultSet rs = stm.executeQuery();

    if (rs.next()) {
        return rs.getInt("id");
    } else {
        throw new Exception("No Poliza Found");
    }
}





    
}
