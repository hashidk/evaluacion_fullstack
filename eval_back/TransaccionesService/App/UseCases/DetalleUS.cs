using TransaccionesService.App.Data;
using TransaccionesService.App.Models;
using Microsoft.EntityFrameworkCore;

namespace TransaccionesService.App.UseCases
{
    public class DetalleUS
    {
        public static async Task agregarDetalles(DataContext context,ICollection<DetalleReq> detalles, Guid tran_id, bool compra)
        {
            try
            {
                foreach (DetalleReq detalle in detalles)
                {
                    var resultado = await ProductosUS.obtenerProducto(context, detalle.prod_id);
                    if (detalle.detalle_cantidad < 1)
                        throw new InvalidOperationException("Asegúrate de que todas las cantidades sean mayores a 0");
                    await context.Detalle.AddAsync(new Detalle
                    {
                        detalle_id = Guid.NewGuid(),
                        detalle_cantidad = detalle.detalle_cantidad,
                        prod_id = detalle.prod_id,
                        tran_id = tran_id,
                    });
                    await ProductosUS.actualizarStock(context, detalle.prod_id, compra, detalle.detalle_cantidad);
                }
                await context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException("No se pudo agregar la transacción: " + ex.Message);
            }
        }
    }
}
