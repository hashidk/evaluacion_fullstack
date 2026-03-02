import { Detalle } from "./detalle";

export class Producto{
    constructor(
        public prod_id:string,
        public prod_nombre:string,
        public prod_categoria:string,
        public prod_imagen:string,
        public prod_precio:number,
        public prod_stock:number,
        public detalles:Detalle[] = [],
    ){}
}