using Microsoft.EntityFrameworkCore;
using TransaccionesService.App.Data;
using TransaccionesService.App.Models;
using System;

namespace TransaccionesService.App.UseCases
{
    public class ProductosUS
    {
        public static async Task actualizarStock(DataContext context, Guid id, bool compra, int cantidad)
        {
            try
            {
                await context.Productos.Where(p => p.prod_id == id).ForEachAsync(p =>
                {
                    if(compra)
                    {
                        p.prod_stock = p.prod_stock + cantidad;
                        return;
                    }
                    else
                    {
                        if (p.prod_stock < Math.Abs(cantidad))
                        {
                            p.prod_stock = p.prod_stock;
                            throw new InvalidOperationException("No existe stock suficiente de '" + p.prod_nombre + "' para completar la acción");
                        }
                        else
                        {
                            p.prod_stock = p.prod_stock - cantidad;
                        }
                    }

                });
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException("No se pudo actualizar el producto: " + ex.Message);
            }
        }

        public static async Task<Producto> obtenerProducto(DataContext context, Guid id)
        {
            var resultado = await context.Productos.Where(p => p.prod_id == id).FirstAsync();
            if (resultado is null)
                throw new InvalidOperationException("No se pudo obtener el producto");
            return resultado;
        }
    }
}
