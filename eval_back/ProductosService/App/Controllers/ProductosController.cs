using Microsoft.AspNetCore.Mvc;
using ProductosService.App.Data;
using ProductosService.App.Models;
using Microsoft.EntityFrameworkCore;
using ProductosService.App.UseCases;

namespace ProductosService.App.Controllers
{
    [Route("api/productos")]
    [ApiController]
    public class ProductosController: ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> listarProductos(DataContext context)
        {
            try
            {
                return Ok(await ProductoUS.obtenerProductos(context));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public  async Task<IActionResult> añadirProductos(DataContext context, [FromBody] Producto producto)
        {
            try
            {
                await ProductoUS.añadirProducto(context, producto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok();
        }

        [HttpGet("{id:Guid}")]
        public async Task<IActionResult> listarProducto(DataContext context, Guid id)
        {
            try
            {
                return Ok(await ProductoUS.obtenerProducto(context, id));
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id:Guid}")]
        public async Task<IActionResult> actualizarProductos(DataContext context, [FromBody] Producto producto, Guid id)
        {
            try
            {
                await ProductoUS.actualizarProducto(context, id, producto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok();
        }

        [HttpDelete("{id:Guid}")]
        public async Task<IActionResult> eliminarProductos(DataContext context, Guid id)
        {
            try
            {
                await ProductoUS.eliminarProducto(context, id);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok();
        }

    }
}
