using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Nexus.Api.Data;
using Nexus.Api.DTOs;
using Nexus.Api.Models;
using Microsoft.AspNetCore.Authorization;

namespace Nexus.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemsController : ControllerBase
    {
        private readonly NexusDbContext _context;

        public ItemsController(NexusDbContext context)
        {
            _context = context;
        }

        // GET: api/Items
        [HttpGet]
        public async Task<IActionResult> GetItems()
        {
            var items = await _context.Items
                .OrderBy(i => i.IdItem)
                .Select(i => new
                {
                    i.IdItem,
                    i.Titulo,
                    i.Descripcion,
                    i.ImagenUrl,
                    i.IdCategoria,
                    Categoria = i.Categoria != null
                        ? i.Categoria.Nombre
                        : null,
                    i.FechaRegistro
                })
                .ToListAsync();

            return Ok(items);
        }

        // GET: api/Items/1
        [HttpGet("{id}")]
        public async Task<IActionResult> GetItem(int id)
        {
            var item = await _context.Items
                .Where(i => i.IdItem == id)
                .Select(i => new
                {
                    i.IdItem,
                    i.Titulo,
                    i.Descripcion,
                    i.ImagenUrl,
                    i.IdCategoria,
                    Categoria = i.Categoria != null
                        ? i.Categoria.Nombre
                        : null,
                    i.FechaRegistro
                })
                .FirstOrDefaultAsync();

            if (item == null)
            {
                return NotFound(new
                {
                    mensaje = "El elemento solicitado no existe."
                });
            }

            return Ok(item);
        }

        // POST: api/Items
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CrearItem(ItemRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Titulo))
            {
                return BadRequest(new
                {
                    mensaje = "El título es obligatorio."
                });
            }

            var categoriaExiste = await _context.Categorias
                .AnyAsync(c => c.IdCategoria == request.IdCategoria);

            if (!categoriaExiste)
            {
                return BadRequest(new
                {
                    mensaje = "La categoría seleccionada no existe."
                });
            }

            var item = new Item
            {
                Titulo = request.Titulo.Trim(),
                Descripcion = request.Descripcion?.Trim(),
                ImagenUrl = request.ImagenUrl?.Trim(),
                IdCategoria = request.IdCategoria,
                FechaRegistro = DateTime.Now
            };

            _context.Items.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetItem),
                new { id = item.IdItem },
                new
                {
                    mensaje = "Elemento creado correctamente.",
                    idItem = item.IdItem
                });
        }

        // PUT: api/Items/1
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> ActualizarItem(
                    int id,
            ItemRequest request)
        {
            var item = await _context.Items.FindAsync(id);

            if (item == null)
            {
                return NotFound(new
                {
                    mensaje = "El elemento solicitado no existe."
                });
            }

            if (string.IsNullOrWhiteSpace(request.Titulo))
            {
                return BadRequest(new
                {
                    mensaje = "El título es obligatorio."
                });
            }

            var categoriaExiste = await _context.Categorias
                .AnyAsync(c => c.IdCategoria == request.IdCategoria);

            if (!categoriaExiste)
            {
                return BadRequest(new
                {
                    mensaje = "La categoría seleccionada no existe."
                });
            }

            item.Titulo = request.Titulo.Trim();
            item.Descripcion = request.Descripcion?.Trim();
            item.ImagenUrl = request.ImagenUrl?.Trim();
            item.IdCategoria = request.IdCategoria;

            await _context.SaveChangesAsync();

            return Ok(new
            {
                mensaje = "Elemento actualizado correctamente."
            });
        }

        // DELETE: api/Items/1
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> EliminarItem(int id)
        {
            var item = await _context.Items.FindAsync(id);

            if (item == null)
            {
                return NotFound(new
                {
                    mensaje = "El elemento solicitado no existe."
                });
            }

            _context.Items.Remove(item);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                mensaje = "Elemento eliminado correctamente."
            });
        }
    }
}