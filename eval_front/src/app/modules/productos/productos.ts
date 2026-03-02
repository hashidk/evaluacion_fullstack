import { Component, inject, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
import { Header } from '../../layout/header/header';
import { Sider } from '../../layout/sider/sider';
import { ProductService } from '../../data/services/product-service';
import { Producto } from '../../data/models/producto';
import { Error } from '../../shared/error/error';
import { validate } from '@angular/forms/signals';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productos',
  imports: [Header, Sider, Error],
  templateUrl: './productos.html',
  styleUrl: './productos.css',
})
export class Productos implements OnInit, OnChanges{
  private router = inject(Router);
  public productos = signal<Producto[]>([]);
  public error:string = "";
  private _productoService = inject(ProductService);

  public indice_actual = signal(1);
  public ultima_pagina = signal(1);
  public filtro = signal("");

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

  eliminarProducto(id:string){
    this.productos.update(ps => ps.filter(value => value.prod_id !== id));
    this._productoService.eliminarProducto(id)
    .subscribe(
      {
        next: data => {
        if(data != null){
          this.error = "";
        }
      },
      error: err => {
        this.error =  err.message;
      }
      }
    );
  }

  paginaAdelante(){
    this.indice_actual.update(value => this.ultima_pagina() > value ? value+1 : value);
  }

  paginaAtras(){
    this.indice_actual.update(value => value > 1 ? value-1 : value);
  }

  nuevoProducto() {
    this.router.navigate(['/productos/registrar']);
  }

  editarProducto(id:string) {
    this.router.navigate(['/productos/registrar', id]);
  }

  onInputChange(event: Event) {
    this.filtro.update(v => (event.target as HTMLInputElement).value);
  }
}
