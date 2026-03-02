import { Producto } from "./producto"
import { Transaccion } from "./transaccion"

export class Detalle{
    constructor(
        public detalle_id:string,
        public detalle_cantidad:number,
        public transaccion:Transaccion,
        public producto:Producto
    ){}
}