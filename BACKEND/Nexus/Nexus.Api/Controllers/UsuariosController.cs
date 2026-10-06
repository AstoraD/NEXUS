using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Nexus.Api.Data;
using Nexus.Api.DTOs;

namespace Nexus.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class UsuariosController : ControllerBase
    {
        private readonly NexusDbContext _context;

        public UsuariosController(
            NexusDbContext context)
        {
            _context = context;
        }

        // =========================================
        // OBTENER TODOS LOS USUARIOS
        // SOLO ADMIN
        // =========================================

        [HttpGet]
        public async Task<IActionResult> GetUsuarios()
        {
            var usuarios =
                await _context.Usuarios
                    .OrderBy(u => u.IdUsuario)
                    .Select(u => new
                    {
                        u.IdUsuario,
                        u.Nombre,
                        u.Correo,
                        u.Rol,
                        u.FechaRegistro
                    })
                    .ToListAsync();

            return Ok(usuarios);
        }
        // =========================================
        // CAMBIAR ROL DE USUARIO
        // SOLO ADMIN
        // =========================================

        [HttpPut("{id}/rol")]
        public async Task<IActionResult> CambiarRol(
            int id,
            [FromBody] CambioRolRequest request)
        {
            var usuario =
                await _context.Usuarios.FindAsync(id);

            if (usuario == null)
            {
                return NotFound(new
                {
                    mensaje = "El usuario no existe."
                });
            }

            if (
                request.Rol != "User" &&
                request.Rol != "Admin"
            )
            {
                return BadRequest(new
                {
                    mensaje =
                        "El rol debe ser User o Admin."
                });
            }

            var idUsuarioActual =
                User.FindFirst(
                    System.Security.Claims.ClaimTypes.NameIdentifier
                )?.Value;

            if (
                idUsuarioActual == id.ToString() &&
                usuario.Rol == "Admin" &&
                request.Rol == "User"
            )
            {
                return BadRequest(new
                {
                    mensaje =
                        "No puedes quitar tu propio rol de administrador."
                });
            }

            usuario.Rol = request.Rol;

            await _context.SaveChangesAsync();

            return Ok(new
            {
                mensaje =
                    "Rol actualizado correctamente.",

                usuario = new
                {
                    usuario.IdUsuario,
                    usuario.Nombre,
                    usuario.Correo,
                    usuario.Rol
                }
            });
        }
    }
}