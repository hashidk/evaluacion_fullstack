import { Detalle } from "./detalle";

export class Transaccion{
    constructor(
        public tran_id:string,
        public tran_fecha:Date,
        public tran_tipo:string,
        public tran_precio_total:number,
        public detalles:Detalle[] = [],
    ){}
}
