import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Header } from '../../layout/header/header';
import { Sider } from '../../layout/sider/sider';
import { FormBuilder, FormControl, FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../../data/models/producto';
import { ProductService } from '../../data/services/product-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-registrar-producto',
  imports: [Header, Sider, ReactiveFormsModule],
  templateUrl: './registrar-producto.html',
  styleUrl: './registrar-producto.css',
})

export class RegistrarProducto implements OnInit {

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private productoService = inject(ProductService);
  private fb = inject(FormBuilder);

  formProducto!: FormGroup;
  productoId: string | null = null;
  modoEdicion = false;

  ngOnInit(): void {

    this.crearFormulario();

    this.productoId = this.route.snapshot.paramMap.get('id');

    if (this.productoId) {
      this.modoEdicion = true;
      this.cargarProducto(this.productoId);
    }
  }

  crearFormulario() {
    this.formProducto = this.fb.group({
      prod_nombre: ['', Validators.required],
      prod_categoria: ['', Validators.required],
      prod_precio: [0, [Validators.required, Validators.min(0)]],
      prod_stock: [0, [Validators.required, Validators.min(0)]]
    });
  }

  cargarProducto(id: string) {
    this.productoService.obtenerProducto(id).subscribe({
      next: (producto) => {
        this.formProducto.patchValue({
          prod_nombre: producto.prod_nombre,
          prod_categoria: producto.prod_categoria,
          prod_precio: producto.prod_precio,
          prod_stock: producto.prod_stock
        });
      },
      error: (err) => console.error(err)
    });
  }

  guardar() {
    if (this.formProducto.invalid) {
      this.formProducto.markAllAsTouched();
      return;
    }

    const productoData = this.formProducto.value;
    const productoNuevo = new Producto(
      '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
      productoData.prod_nombre,
      productoData.prod_categoria,
      "",
      productoData.prod_precio,
      productoData.prod_stock,
    )


    console.log(productoNuevo);
    
    if (this.modoEdicion && this.productoId) {
      productoNuevo.prod_id = this.productoId;
      this.productoService.actualizarProducto(productoNuevo)
        .subscribe({
          next: () => {
            console.log('Producto actualizado');
            this.router.navigate(['/productos']);
          },
          error: err => console.error(err)
        });

    } else {

      this.productoService.añadirProducto(productoNuevo)
        .subscribe({
          next: () => {
            console.log('Producto creado');
            this.router.navigate(['/productos']);
          },
          error: err => console.error(err)
        });
    }
  }
}