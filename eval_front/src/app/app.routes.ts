import { Routes } from '@angular/router';
import { Home } from './modules/home/home';
import { Productos } from './modules/productos/productos';
import { Transacciones } from './modules/transacciones/transacciones';
import { RegistrarTransaccion } from './modules/registrar-transaccion/registrar-transaccion';
import { RegistrarProducto } from './modules/registrar-producto/registrar-producto';

export const routes: Routes = [
    {
        path: '',
        component: Home,
    },
    {
        path: 'productos',
        component: Productos,
    },
    {
        path: 'productos/registrar',
        component: RegistrarProducto,
    },
    {
        path: 'productos/registrar/:id',
        component: RegistrarProducto,
    },
    {
        path: 'transacciones',
        component: Transacciones,
    },
    {
        path: 'transacciones/registrar',
        component: RegistrarTransaccion,
    },
    {
        path: 'transacciones/registrar/:id',
        component: RegistrarTransaccion,
    },
    {
        path: '**',
        component: Home,
    },
];
