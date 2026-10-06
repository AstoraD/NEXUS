using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Nexus.Api.Data;

namespace Nexus.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriasController : ControllerBase
    {
        private readonly NexusDbContext _context;

        public CategoriasController(NexusDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetCategorias()
        {
            var categorias = await _context.Categorias
                .OrderBy(c => c.IdCategoria)
                .Select(c => new
                {
                    c.IdCategoria,
                    c.Nombre
                })
                .ToListAsync();

            return Ok(categorias);
        }
    }
}