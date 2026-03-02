using System.ComponentModel.DataAnnotations;

namespace TransaccionesService.App.Models
{
    public class DetalleReq
    {
        [Key]
        public Guid? detalle_id { get; set; }
        public int detalle_cantidad { get; set; }
        public Guid prod_id { get; set; }
    }
}
