package com.progra.countries.logic;

import jakarta.json.bind.annotation.JsonbTransient;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class Poliza {

    private int id;
    private String numeroPlaca;
    private String anno;
    private double valorAsegurado;
    private String plazoPago;
    private String fechaInicio;
    private Modelo modelo;
    private Cliente cliente;
    private List<Cobertura> coberturas;

    public Poliza() {
        this(0, "", "", 0, "", "", new Modelo(), new Cliente());
    }

    public Poliza(int id, String numeroPlaca, String anno, double valorAsegurado, String plazoPago, String fechaInicio, Modelo modelo, Cliente cliente) {
        this.id = id;
        this.numeroPlaca = numeroPlaca;
        this.anno = anno;
        this.valorAsegurado = valorAsegurado;
        this.plazoPago = plazoPago;
        this.fechaInicio = fechaInicio;
        this.modelo = modelo;
        this.cliente = cliente;
        this.coberturas = new ArrayList<>();
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNumeroPlaca() {
        return numeroPlaca;
    }

    public void setNumeroPlaca(String numeroPlaca) {
        this.numeroPlaca = numeroPlaca;
    }

    public String getAnno() {
        return anno;
    }

    public void setAnno(String anno) {
        this.anno = anno;
    }

    public double getValorAsegurado() {
        return valorAsegurado;
    }

    public void setValorAsegurado(double valorAsegurado) {
        this.valorAsegurado = valorAsegurado;
    }

    public String getPlazoPago() {
        return plazoPago;
    }

    public void setPlazoPago(String plazoPago) {
        this.plazoPago = plazoPago;
    }

    public String getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(String fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public Modelo getModelo() {
        return modelo;
    }

    public void setModelo(Modelo modelo) {
        this.modelo = modelo;
    }
    
    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public List<Cobertura> getCoberturas() {
        return coberturas;
    }

    public void setCoberturas(List<Cobertura> coberturas) {
        this.coberturas = coberturas;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null || getClass() != obj.getClass()) {
            return false;
        }
        Poliza poliza = (Poliza) obj;
        return Objects.equals(numeroPlaca, poliza.numeroPlaca);
    }

    @Override
    public int hashCode() {
        return Objects.hash(numeroPlaca);
    }
}
