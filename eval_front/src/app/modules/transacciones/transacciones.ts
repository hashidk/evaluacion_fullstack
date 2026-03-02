import { Component, inject, signal, SimpleChanges } from '@angular/core';
import { Header } from '../../layout/header/header';
import { Sider } from '../../layout/sider/sider';
import { Router } from '@angular/router';
import { Producto } from '../../data/models/producto';
import { ProductService } from '../../data/services/product-service';
import { TransactionService } from '../../data/services/transaction-service';

@Component({
  selector: 'app-transacciones',
  imports: [Header, Sider],
  templateUrl: './transacciones.html',
  styleUrl: './transacciones.css',
})
export class Transacciones {
  
  private router = inject(Router);
  public productos = signal<Producto[]>([]);
  public error:string = "";
  private _transactionService = inject(TransactionService);

  public indice_actual = signal(1);
  public ultima_pagina = signal(1);

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos(){
    this._transactionService.obtenerProductosTransacciones()
      .subscribe({
        next: data => {
          if(data !== null){
            this.productos.update(value => data);
            this.ultima_pagina.update(value => Math.ceil(this.productos().filter(v => v.detalles.length!==0).length / 8)) 
            this.error = "";
          }
        },
        error: err => {
          this.error = err.message;
        }
      }); 
  }

  paginaAdelante(){
    this.indice_actual.update(value => this.ultima_pagina() > value ? value+1 : value);
  }

  paginaAtras(){
    this.indice_actual.update(value => value > 1 ? value-1 : value);
  }
}

