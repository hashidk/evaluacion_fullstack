using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TransaccionesService.App.Models
{
    public class Transaccion
    {
        [Key]
        public Guid tran_id { get; set; }
        public DateOnly tran_fecha { get; set; }
        public string tran_tipo { get; set; }

        [Column(TypeName = "decimal(18, 2)")]
        public float tran_precio_total { get; set; }
        public ICollection<Detalle> detalles { get; set; }
    }
}
