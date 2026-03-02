import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
    public base_url:string;
    public headers:HttpHeaders
    private _http = inject(HttpClient)

    constructor(
    ){
        this.base_url = "http://localhost:5041/api/productos";
        this.headers = new HttpHeaders().set('Content-Type','application/json');
    }

    obtenerProductos(){
        return this._http.get<Producto[]>(this.base_url,{headers:this.headers});
    }

    añadirProducto(producto:Producto):Observable<any>{
        let params=JSON.stringify(producto);
        console.log(params);
        
        return this._http.post(this.base_url,params,{headers:this.headers});
    }

    obtenerProducto(id:String):Observable<any>{
        return this._http.get(this.base_url+'/'+id,{headers:this.headers});
    }

    actualizarProducto(producto:Producto):Observable<any>{
        let params=JSON.stringify(producto);
        return this._http.put(this.base_url+'/'+producto.prod_id,params,{headers:this.headers});
    }

    eliminarProducto(id:String):Observable<any>{
        return this._http.delete(this.base_url+'/'+id,{headers:this.headers});
    }
}
