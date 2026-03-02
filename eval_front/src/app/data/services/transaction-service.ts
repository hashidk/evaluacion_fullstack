import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Detalle } from '../models/detalle';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
    public base_url:string;
    public headers:HttpHeaders

    constructor(
      private _http:HttpClient
    ){
        this.base_url="http://localhost:5086/api/transacciones";
        this.headers = new HttpHeaders().set('Content-Type','application/json');
    }

    obtenerTransacciones():Observable<any>{
        return this._http.get(this.base_url,{headers:this.headers});
    }

    obtenerProductosTransacciones():Observable<any>{
        return this._http.get(this.base_url+"/productos",{headers:this.headers});
    }

    añadirTransaccion(detalles:any[],compra:boolean):Observable<any>{
        let params=JSON.stringify(detalles);
        console.log(params);
        let url:string = this.base_url;
        if(compra){
          url=url+"/comprar"
        }else{
          url=url+"/vender"
        }
        
        return this._http.post(url,params,{headers:this.headers});
    }

}
