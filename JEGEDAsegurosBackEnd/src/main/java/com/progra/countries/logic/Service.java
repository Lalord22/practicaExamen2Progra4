/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.progra.countries.logic;

import com.progra.guia.data.CategoriaDao;
import com.progra.guia.data.ClienteDao;
import com.progra.guia.data.CoberturaDao;
import com.progra.guia.data.MarcaDao;
import com.progra.guia.data.ModeloDao;
import com.progra.guia.data.PolizaDao;
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
    ClienteDao clienteDao;
    PolizaDao polizaDao;
    CoberturaDao coberturaDao;
    CategoriaDao categoriaDao;
    ModeloDao modeloDao;
    MarcaDao marcaDao;

   private List<Usuario> usuarios;

private Service() {
    relDatabase = new RelDatabase();
    usuarioDao = new UsuarioDao(relDatabase);
    clienteDao = new ClienteDao(relDatabase);
    polizaDao = new PolizaDao(relDatabase);
    coberturaDao = new CoberturaDao(relDatabase);
    categoriaDao = new CategoriaDao(relDatabase);
    modeloDao = new ModeloDao(relDatabase);
    marcaDao = new MarcaDao(relDatabase);
    
    usuarios = new ArrayList<>(); // Initialize the usuarios list
    
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

    public Cliente clienteFind(Usuario usuario) throws Exception {  //implementado, la ruta contiene /categorias
        return clienteDao.read(usuario.getCedula());
    }

    public List<Poliza> polizaFind(Cliente cliente) throws Exception {  //se implemento el de cargarPolizasCliente en vez de este
        List<Poliza> polizas = polizaDao.findByCliente(cliente);
        for (Poliza e : polizas) {
            e.setCliente(cliente);
        }
        cliente.setPolizas(polizas);
        return polizas;
    }

    public void clienteUpdate(Cliente cliente) throws Exception {    //implementado
        clienteDao.update(cliente);
    }

    public void usuarioUpdate(Usuario usuario) throws Exception {    // implementado
        usuarioDao.update(usuario);
    }

    public List<Poliza> polizaFindPlaca(String numero) throws Exception {   //implementado
        return polizaDao.findByPlaca(numero);
    }

    public void registerUser(Usuario u) throws Exception {         //implementado
        usuarioDao.addUser(u);
    }

    public void registerCliente(Cliente cliente) throws Exception {   // implementado
        clienteDao.addClient(cliente);
    }
    
    public void registerClienteandUser(Cliente cliente) throws Exception {   
        clienteDao.addClient(cliente);
    }

    public Poliza polizaShowById(Integer parameter) throws Exception {  // implementado

        return polizaDao.read(parameter);

    }

    public List<Cobertura> cargarCoberturas() {       // implementado
        return coberturaDao.cargarTodo();
    }

    public List<Categoria> cargarCategorias() {      //implementado
        return categoriaDao.cargarTodo();
    }

    public void agregaCategoria(Categoria categoria) throws Exception { //implementado
        this.categoriaDao.addCategoria(categoria);
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

    public Categoria cargarCategoriaById(Integer id) throws Exception {       //implementado
        return categoriaDao.read(id);
    }

    public void agregaCobertura(Cobertura cobertura) throws Exception {   //implementado
        coberturaDao.addCobertura(cobertura);
    }

    public void deleteCobertura(String id) throws Exception {    //no se utiliza
        this.coberturaDao.deleteById(id);
    }

    public List<Cliente> cargarClientes() {   //implementado
        return clienteDao.cargarTodo();
    }

    public List<Poliza> cargarPolizasCliente(String id) throws Exception {   // implementado
        Cliente cliente = clienteDao.readCliente(id);
        List<Poliza> polizas = polizaDao.findByCliente(cliente);
        for (Poliza e : polizas) {
            e.setCliente(cliente);
        }
        cliente.setPolizas(polizas);
        return polizas;
    }

    public void agregarModelo(Modelo u) throws Exception {    //implementado**
        modeloDao.addModelo(u);
    }

    public void agregarMarca(Marca u) throws Exception {    //implementado
        marcaDao.addMarca(u);
    }

    public Cobertura cargarCoberturaById(String coverageId) throws Exception {   //implementado
        Integer value = Integer.parseInt(coverageId);
        return this.coberturaDao.read(value);
    }

    public Modelo cargarModeloById(int modeloId) throws Exception {   //implementado

        return this.modeloDao.read(modeloId);

    }

    public void agregarPoliza(Poliza poliza) throws SQLException {
        this.polizaDao.addPoliza(poliza); // Register the Poliza object
        
        
        
    }
    
    public void agregarPolizaCobertura(Poliza poliza) throws SQLException {
    
        this.polizaDao.insertCoberturas(poliza);
    
}

    public double calcularCostoTotalPoliza(Poliza poliza) {  //implementado
        double totalCosto = 0.0; //costo total a ser retornado

        int multiplicadorPeriodoPago = 1; // multiplica el costo total de acuerdo a la cantidad de meses en el plazo de la poliza

        double valorCalculado = poliza.getValorAsegurado();  //carga el valor del carro

        List<Cobertura> coberturas = poliza.getCoberturas();  //carga la lista de coberturas de la poliza

        if (poliza.getPlazoPago().equals("trimestral")) {   //actualiza el multiplicador de acuerdo a la cantidad de meses de servicio
            multiplicadorPeriodoPago = 3;
        } else if (poliza.getPlazoPago().equals("semestral")) {
            multiplicadorPeriodoPago = 6;
        } else {
            multiplicadorPeriodoPago = 12;
        }
        for (Cobertura cobertura : coberturas) {
            double costo = valorCalculado * (cobertura.getCostoPorcentual()/100) <  cobertura.getCostoMinimo() ? cobertura.getCostoMinimo() : valorCalculado * (cobertura.getCostoPorcentual()/100); // setea costo de acuerdo si el carro vale menos de 
            totalCosto += costo;                                                                                                                                             // 3000, retorna el costo minimo de la cobertura, sino, el costo porcentual sobre el carro
        }
        totalCosto *= multiplicadorPeriodoPago; //actualiza el pago por el numero de meses de servicio
        if (poliza.getPlazoPago().equals("semestral")) {
            totalCosto *= 0.95; // aplicar 5% de descuento para semestral
        } else if (poliza.getPlazoPago().equals("anual")) {
            totalCosto *= 0.9; // aplicar 10% de descuento para anual
        }
        
        DecimalFormat decimalFormat = new DecimalFormat("#.##");
        String formattedValue = decimalFormat.format(totalCosto);
        double modifiedValue = Double.parseDouble(formattedValue);
        
        return modifiedValue;
    }

    public List<Usuario> getAllUsuarios() {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    public Modelo cargarUltimoModelo() throws Exception {
        return this.modeloDao.getLastModelo();
    }

    public int getLatestPoliza() throws Exception {
        return this.polizaDao.getPolizaWithHighestId();
    }

    public List<Cobertura> cargarCoberturasByPolizaId(int polizaId) {
        return this.coberturaDao.getCoberturasByPolizaId(polizaId);
                }
}
