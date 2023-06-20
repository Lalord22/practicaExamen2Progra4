/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.progra.countries.logic;
import jakarta.json.bind.annotation.JsonbProperty;
import java.io.Serializable;


/*
 *Proyecto I Programacion 4
 * 
 *Jennifer Lobo Vasquez
 *Daniela Madrigal Morales
 *Gerardo Salzar Vargas
 * 
 */


public class Cobertura  implements Serializable{
    Integer id;
    String descripcion;
    double costoMinimo;
    double costoPorcentual;
    Categoria categoria;

    public Cobertura() {}
    
    public Cobertura(String descripcion, double costoMinimo, double costoPorcentual, Categoria categoria) {
        this.id = 999;
        this.descripcion = descripcion;
        this.costoMinimo = costoMinimo;
        this.costoPorcentual = costoPorcentual;
        this.categoria = categoria;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public double getCostoMinimo() {
        return costoMinimo;
    }

    public void setCostoMinimo(double costoMinimo) {
        this.costoMinimo = costoMinimo;
    }

    public double getCostoPorcentual() {
        return costoPorcentual;
    }

    public void setCostoPorcentual(double costoPorcentual) {
        this.costoPorcentual = costoPorcentual;
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }  
}
