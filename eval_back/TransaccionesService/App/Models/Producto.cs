using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TransaccionesService.App.Models
{
    public class Producto
    {
        [Key]
        public Guid prod_id { get; set; }
        public string prod_nombre { get; set; }
        public string prod_categoria { get; set; }
        public string? prod_imagen { get; set; }
        
        [Column(TypeName = "decimal(18, 2)")]
        public float prod_precio { get; set; }
        public int prod_stock { get; set; }
        public ICollection<Detalle> detalles { get; set; }
    }
}
