using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TransaccionesService.App.Data;
using TransaccionesService.App.Models;
using TransaccionesService.App.UseCases;

namespace TransaccionesService.App.Controllers
{
    [Route("api/transacciones")]
    [ApiController]
    public class TransaccionesController: ControllerBase
    {
        [HttpPost("comprar")]
        public async Task<IActionResult> listarProductos(DataContext context, [FromBody] ICollection<DetalleReq> detalles)
        {
            Console.WriteLine("Detalles recibidos: ", detalles.ToString());
            try
            {
                await TransaccionesUS.añadirTransaccion(context, detalles, true);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok();
        }

        [HttpPost("vender")]
        public  async Task<IActionResult> añadirProductos(DataContext context, [FromBody] ICollection<DetalleReq> detalles)
        {
            Console.WriteLine("Detalles recibidos: ", detalles.ToString());
            try
            {
                await TransaccionesUS.añadirTransaccion(context, detalles, false);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> listarTransacciones(DataContext context)
        {
            try
            {
                return Ok(await TransaccionesUS.obtenerTransacciones(context));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("productos")]
        public async Task<IActionResult> listarProductos(DataContext context)
        {
            try
            {
                return Ok(await TransaccionesUS.obtenerProductosTransacciones(context));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
