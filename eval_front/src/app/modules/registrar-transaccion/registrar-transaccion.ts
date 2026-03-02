import { Component, effect, inject, Input, OnChanges, signal, SimpleChanges } from '@angular/core';
import { Header } from '../../layout/header/header';
import { Sider } from '../../layout/sider/sider';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../../data/services/product-service';
import { Producto } from '../../data/models/producto';
import { Router } from '@angular/router';
import { Error } from '../../shared/error/error';
import { TransactionService } from '../../data/services/transaction-service';

@Component({
  selector: 'app-registrar-transaccion',
  imports: [Header, Sider, ReactiveFormsModule, Error],
  templateUrl: './registrar-transaccion.html',
  styleUrl: './registrar-transaccion.css',
})
export class RegistrarTransaccion  {
 private router = inject(Router);
  public productos = signal<Producto[]>([]);
  public productosSelected = signal<Producto[]>([]);
  public error:string = "";
  private _productoService = inject(ProductService);
  private _transactionService = inject(TransactionService);


  public indice_actual = signal(1);
  public ultima_pagina = signal(1);

  public indice_actual_2 = signal(1);
  public ultima_pagina_2 = signal(1);

  private fb = inject(FormBuilder);

  form = this.fb.group({
    productos: this.fb.array([])
  });

  get productosFormArray(): FormArray {
    return this.form.get('productos') as FormArray;
  }

  constructor() {
    effect(() => {
      this.sincronizarFormulario(this.productosSelected());
      
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos(){
    this._productoService.obtenerProductos()
      .subscribe({
        next: data => {
          if(data !== null){
            this.productos.update(value => data);
            this.ultima_pagina.update(value => Math.ceil(this.productos().length / 8))
            this.error = "";
          }
        },
        error: err => {
          this.error = err.message;
        }
      }); 
  }

   agregarProducto(producto:Producto){
    this.productos.update(ps => ps.filter(value => value.prod_id !== producto.prod_id));
    this.productosSelected.update(ps => [...ps, producto]);    
    this.ultima_pagina.update(value => Math.ceil(this.productos().length / 8))
    this.ultima_pagina_2.update(value => Math.ceil(this.productosSelected().length / 7))

  }

  eliminarProducto(producto:Producto){
    this.productosSelected.update(ps => ps.filter(value => value.prod_id !== producto.prod_id));
    this.productos.update(ps => [...ps, producto]);
    this.ultima_pagina.update(value => Math.ceil(this.productos().length / 8))
    this.ultima_pagina_2.update(value => Math.ceil(this.productosSelected().length / 7))
  }

  paginaAdelante(){
    this.indice_actual.update(value => this.ultima_pagina() > value ? value+1 : value);
  }

  paginaAtras(){
    this.indice_actual.update(value => value > 1 ? value-1 : value);
  }
    
  paginaAdelante_2(){
    this.indice_actual_2.update(value => this.ultima_pagina_2() > value ? value+1 : value);
  }

  paginaAtras_2(){
    this.indice_actual_2.update(value => value > 1 ? value-1 : value);
  }

  sincronizarFormulario(productos: Producto[]) {

    this.productosFormArray.clear();

    productos.forEach(producto => {
      this.productosFormArray.push(
        this.fb.group({
          prod_id: [producto.prod_id],
          detalle_cantidad: [1, [Validators.required, Validators.min(1)]]
        })
      );
    });
  }

  registrarVenta() {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const datos = this.form.value.productos;
    if(datos?.length===0){
      return;
    }

    this._transactionService.añadirTransaccion(datos!,false)      
    .subscribe({
        next: data => {
          console.log(data);
          this.error = "";
        },
        error: err => {
          this.error = err.error;
        }
      });
  }

  registrarCompra() {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const datos = this.form.value.productos;
        if(datos?.length===0){
      return;
    }    

    this._transactionService.añadirTransaccion(datos!,true)      
    .subscribe({
        next: data => {
          this.error = "";
        },
        error: err => {
          this.error = err.message;
          console.log(err);
          
        }
      });
  }

}