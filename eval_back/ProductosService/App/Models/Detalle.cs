using System.ComponentModel.DataAnnotations;

namespace ProductosService.App.Models
{
    public class Detalle
    {
        [Key]
        public Guid detalle_id { get; set; }
        public int detalle_cantidad { get; set; }

        public Guid tran_id { get; set; }
        public Guid prod_id { get; set; }

        public Transaccion transaccion { get; set; }
        public Producto producto { get; set; }
    }
}
