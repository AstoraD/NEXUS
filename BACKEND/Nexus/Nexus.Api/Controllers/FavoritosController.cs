using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Nexus.Api.Data;
using Nexus.Api.Models;
using System.Security.Claims;

namespace Nexus.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class FavoritosController : ControllerBase
    {
        private readonly NexusDbContext _context;

        public FavoritosController(NexusDbContext context)
        {
            _context = context;
        }

        // GET: api/Favoritos
        [HttpGet]
        public async Task<IActionResult> GetFavoritos()
        {
            int? idUsuario = ObtenerIdUsuario();

            if (idUsuario == null)
            {
                return Unauthorized(new
                {
                    mensaje = "No fue posible identificar al usuario."
                });
            }

            var favoritos = await _context.Favoritos
                .Where(f => f.IdUsuario == idUsuario.Value)
                .OrderByDescending(f => f.FechaRegistro)
                .Select(f => new
                {
                    f.IdFavorito,
                    f.IdItem,
                    Titulo = f.Item != null
                        ? f.Item.Titulo
                        : null,
                    Descripcion = f.Item != null
                        ? f.Item.Descripcion
                        : null,
                    ImagenUrl = f.Item != null
                        ? f.Item.ImagenUrl
                        : null,
                    IdCategoria = f.Item != null
                        ? f.Item.IdCategoria
                        : 0,
                    Categoria = f.Item != null &&
                                f.Item.Categoria != null
                        ? f.Item.Categoria.Nombre
                        : null,
                    f.FechaRegistro
                })
                .ToListAsync();

            return Ok(favoritos);
        }

        // POST: api/Favoritos/5
        [HttpPost("{idItem}")]
        public async Task<IActionResult> AgregarFavorito(int idItem)
        {
            int? idUsuario = ObtenerIdUsuario();

            if (idUsuario == null)
            {
                return Unauthorized(new
                {
                    mensaje = "No fue posible identificar al usuario."
                });
            }

            bool itemExiste = await _context.Items
                .AnyAsync(i => i.IdItem == idItem);

            if (!itemExiste)
            {
                return NotFound(new
                {
                    mensaje = "El elemento solicitado no existe."
                });
            }

            bool yaExiste = await _context.Favoritos
                .AnyAsync(f =>
                    f.IdUsuario == idUsuario.Value &&
                    f.IdItem == idItem);

            if (yaExiste)
            {
                return Conflict(new
                {
                    mensaje = "El elemento ya está en tu colección."
                });
            }

            var favorito = new Favorito
            {
                IdUsuario = idUsuario.Value,
                IdItem = idItem,
                FechaRegistro = DateTime.Now
            };

            _context.Favoritos.Add(favorito);

            await _context.SaveChangesAsync();

            return Ok(new
            {
                mensaje = "Elemento agregado a tu colección."
            });
        }

        // DELETE: api/Favoritos/5
        [HttpDelete("{idItem}")]
        public async Task<IActionResult> EliminarFavorito(int idItem)
        {
            int? idUsuario = ObtenerIdUsuario();

            if (idUsuario == null)
            {
                return Unauthorized(new
                {
                    mensaje = "No fue posible identificar al usuario."
                });
            }

            var favorito = await _context.Favoritos
                .FirstOrDefaultAsync(f =>
                    f.IdUsuario == idUsuario.Value &&
                    f.IdItem == idItem);

            if (favorito == null)
            {
                return NotFound(new
                {
                    mensaje = "El elemento no está en tu colección."
                });
            }

            _context.Favoritos.Remove(favorito);

            await _context.SaveChangesAsync();

            return Ok(new
            {
                mensaje = "Elemento eliminado de tu colección."
            });
        }

        private int? ObtenerIdUsuario()
        {
            string? valor = User.FindFirstValue(
                ClaimTypes.NameIdentifier
            );

            if (int.TryParse(valor, out int idUsuario))
            {
                return idUsuario;
            }

            return null;
        }
    }
}