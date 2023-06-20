package com.progra.countries.logic;


import java.util.ArrayList;
import java.util.List;

public class PolizaDTO {
    private int id;
    private String numeroPlaca;
    private String anno;
    private double valorAsegurado;
    private String plazoPago;
    private String fechaInicio;
    private Modelo modelo;

    public PolizaDTO() {
    }

    public PolizaDTO(Poliza poliza) {
        this.id = poliza.getId();
        this.numeroPlaca = poliza.getNumeroPlaca();
        this.anno = poliza.getAnno();
        this.valorAsegurado = poliza.getValorAsegurado();
        this.plazoPago = poliza.getPlazoPago();
        this.fechaInicio = poliza.getFechaInicio();
        this.modelo = poliza.getModelo();
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

    // Getters and setters

    public static List<PolizaDTO> fromPolizas(List<Poliza> polizas) {
        List<PolizaDTO> polizaDTOs = new ArrayList<>();
        for (Poliza poliza : polizas) {
            polizaDTOs.add(new PolizaDTO(poliza));
        }
        return polizaDTOs;
    }
}
