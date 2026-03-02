using ProductosService.App.Data;
using ProductosService.App.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace ProductosService.App.UseCases
{
    public class ProductoUS
    {
        public static async Task<ICollection<Producto>> obtenerProductos(DataContext context)
        {
            var resultado = await context.Productos.ToListAsync();
            if(resultado.IsNullOrEmpty())
                throw new InvalidOperationException("No se pudieron obtener los productos");
            return resultado;
        }

        public static async Task<Producto> obtenerProducto(DataContext context, Guid id)
        {
            var resultado = await context.Productos.Where(p => p.prod_id == id).FirstAsync();
            if (resultado is null)
                throw new InvalidOperationException("No se pudo obtener el producto");
            return resultado; 
        }

        public static async Task añadirProducto(DataContext context, Producto producto)
        {
            try
            {
                await context.Productos.AddAsync(new Producto
                {
                    prod_id = Guid.NewGuid(),
                    prod_nombre = producto.prod_nombre,
                    prod_categoria = producto.prod_categoria,
                    prod_imagen = producto.prod_imagen,
                    prod_precio = producto.prod_precio,
                    prod_stock = producto.prod_stock,
                    detalles = []
                });
                await context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException("No se pudo agregar el producto: " + ex.Message);
            }
        }

        public static async Task actualizarProducto(DataContext context, Guid id, Producto producto)
        {
            try
            {
                var result = await obtenerProducto(context, id);//verificar si existe el producto;
                await context.Productos.Where(p => p.prod_id == id).ForEachAsync(p =>
                {
                    p.prod_nombre = producto.prod_nombre;
                    p.prod_categoria = producto.prod_categoria;
                    p.prod_imagen = producto.prod_imagen;
                    p.prod_precio = producto.prod_precio;
                    p.prod_stock = producto.prod_stock;
                });
                await context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException("No se pudo actualizar el producto: " + ex.Message);
            }
        }

        public static async Task eliminarProducto(DataContext context, Guid id)
        {
            try
            {
                
                await obtenerProducto(context, id); //rerificar si existe el producto
                await context.Productos.Where(p => p.prod_id == id).ExecuteDeleteAsync();
                await context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException("No se pudo eliminar el producto: " + ex.Message);
            }

        }
    }
}
