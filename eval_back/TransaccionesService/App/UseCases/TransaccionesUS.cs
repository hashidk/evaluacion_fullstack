using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using TransaccionesService.App.Data;
using TransaccionesService.App.Models;

namespace TransaccionesService.App.UseCases
{
    public class TransaccionesUS
    {
        public static async Task<ICollection<Transaccion>> obtenerTransacciones(DataContext context)
        {
            var resultado = await context.Transacciones
                .Select(t => new
                Transaccion{
                    tran_tipo = t.tran_tipo,
                    tran_fecha = t.tran_fecha,
                    tran_precio_total = t.tran_precio_total,
                    tran_id =t.tran_id,
                    detalles = (ICollection<Detalle>)t.detalles.Select(d => new Detalle
                    {
                        detalle_id = d.detalle_id,
                        detalle_cantidad = d.detalle_cantidad,
                        prod_id = d.prod_id,
                        tran_id = d.tran_id,
                        producto = d.producto,
                    }),

                })
                .ToListAsync();
            if(resultado.IsNullOrEmpty())
                throw new InvalidOperationException("No se pudieron obtener los productos");
            return resultado;
        }

        public static async Task<ICollection<Producto>> obtenerProductosTransacciones(DataContext context)
        {
            var resultado = await context.Productos
                .Select(t => new Producto
                {
                    prod_id = t.prod_id,
                    prod_nombre = t.prod_nombre,
                    prod_categoria = t.prod_categoria,
                    prod_imagen = t.prod_imagen,
                    prod_precio = t.prod_precio,
                    prod_stock = t.prod_stock,
                    detalles = (ICollection<Detalle>)t.detalles.Select(d => new Detalle
                    {
                        detalle_id = d.detalle_id,
                        detalle_cantidad = d.detalle_cantidad,
                        prod_id = d.prod_id,
                        tran_id = d.tran_id,
                        transaccion = d.transaccion,
                    }),
                })
                .ToListAsync();
            if (resultado.IsNullOrEmpty())
                throw new InvalidOperationException("No se pudieron obtener los productos");
            return resultado;
        }

        public static async Task añadirTransaccion(DataContext context, ICollection<DetalleReq> detalles, bool compra)
        {
            Guid transaccion_id = Guid.NewGuid();
            using var transaction = await context.Database.BeginTransactionAsync();
            try
            {
                await context.Transacciones.AddAsync(new Transaccion
                {
                    tran_id = transaccion_id,
                    tran_fecha = DateOnly.FromDateTime(DateTime.Now),
                    tran_tipo = compra ? "compra" : "venta",
                    tran_precio_total = 0,
                    detalles = []
                });
                await context.SaveChangesAsync();

                await DetalleUS.agregarDetalles(context, detalles, transaccion_id, compra);
                await actualizarPrecioTotal(context, transaccion_id);


                await transaction.CommitAsync();

            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                throw new InvalidOperationException("No se pudo agregar la transacción: " + ex.Message);
            }
        }

        public static async Task actualizarPrecioTotal(DataContext context, Guid transaccion_id)
        {
            float total = 0;
            var transaccion = await context.Transacciones.Where(t => t.tran_id == transaccion_id)
            .Select(t => new
            {
                detalles = t.detalles.Select(d => new
                {
                    detalle_cantidad = d.detalle_cantidad,
                    precio = d.producto.prod_precio,
                }),
            }).FirstOrDefaultAsync();

            transaccion.detalles.ToList().ForEach(d => total += d.detalle_cantidad * d.precio);

            await context.Transacciones.Where(t => t.tran_id == transaccion_id).ForEachAsync(t => t.tran_precio_total = total);
            await context.SaveChangesAsync();
        }
    }
}
