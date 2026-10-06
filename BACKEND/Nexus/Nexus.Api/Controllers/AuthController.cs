using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Nexus.Api.Data;
using Nexus.Api.DTOs;
using Nexus.Api.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Nexus.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly NexusDbContext _context;
        private readonly PasswordHasher<Usuario> _passwordHasher;
        private readonly IConfiguration _configuration;

        public AuthController(
            NexusDbContext context,
            IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
            _passwordHasher = new PasswordHasher<Usuario>();
        }

        // =========================================
        // REGISTRO
        // =========================================

        [HttpPost("registro")]
        public async Task<IActionResult> Registro(
            RegistroRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Nombre))
            {
                return BadRequest(new
                {
                    mensaje = "El nombre es obligatorio."
                });
            }

            if (string.IsNullOrWhiteSpace(request.Correo))
            {
                return BadRequest(new
                {
                    mensaje = "El correo es obligatorio."
                });
            }

            if (string.IsNullOrWhiteSpace(request.Password) ||
                request.Password.Length < 6)
            {
                return BadRequest(new
                {
                    mensaje =
                        "La contraseña debe tener mínimo 6 caracteres."
                });
            }

            string correo =
                request.Correo.Trim().ToLower();

            bool correoExiste =
                await _context.Usuarios.AnyAsync(
                    u => u.Correo.ToLower() == correo
                );

            if (correoExiste)
            {
                return Conflict(new
                {
                    mensaje =
                        "Ya existe un usuario con ese correo."
                });
            }

            var usuario = new Usuario
            {
                Nombre = request.Nombre.Trim(),
                Correo = correo,
                Rol = "User",
                FechaRegistro = DateTime.Now
            };

            usuario.PasswordHash =
                _passwordHasher.HashPassword(
                    usuario,
                    request.Password
                );

            _context.Usuarios.Add(usuario);

            await _context.SaveChangesAsync();

            return StatusCode(201, new
            {
                mensaje =
                    "Usuario registrado correctamente.",

                usuario = new
                {
                    usuario.IdUsuario,
                    usuario.Nombre,
                    usuario.Correo,
                    usuario.Rol
                }
            });
        }

        // =========================================
        // LOGIN
        // =========================================

        [HttpPost("login")]
        public async Task<IActionResult> Login(
            LoginRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Correo) ||
                string.IsNullOrWhiteSpace(request.Password))
            {
                return BadRequest(new
                {
                    mensaje =
                        "Correo y contraseña son obligatorios."
                });
            }

            string correo =
                request.Correo.Trim().ToLower();

            var usuario =
                await _context.Usuarios
                    .FirstOrDefaultAsync(
                        u => u.Correo.ToLower() == correo
                    );

            if (usuario == null)
            {
                return Unauthorized(new
                {
                    mensaje =
                        "Correo o contraseña incorrectos."
                });
            }

            var resultado =
                _passwordHasher.VerifyHashedPassword(
                    usuario,
                    usuario.PasswordHash,
                    request.Password
                );

            if (resultado ==
                PasswordVerificationResult.Failed)
            {
                return Unauthorized(new
                {
                    mensaje =
                        "Correo o contraseña incorrectos."
                });
            }

            string token =
                GenerarToken(usuario);

            return Ok(new
            {
                mensaje =
                    "Inicio de sesión correcto.",

                token = token,

                usuario = new
                {
                    usuario.IdUsuario,
                    usuario.Nombre,
                    usuario.Correo,
                    usuario.Rol
                }
            });
        }

        // =========================================
        // GENERAR TOKEN JWT
        // =========================================

        private string GenerarToken(
            Usuario usuario)
        {
            var claims = new[]
            {
                new Claim(
                    ClaimTypes.NameIdentifier,
                    usuario.IdUsuario.ToString()
                ),

                new Claim(
                    ClaimTypes.Name,
                    usuario.Nombre
                ),

                new Claim(
                    ClaimTypes.Email,
                    usuario.Correo
                ),

                new Claim(
                    ClaimTypes.Role,
                    usuario.Rol
                )
            };

            var jwtKey =
                _configuration["Jwt:Key"]
                ?? throw new InvalidOperationException(
                    "No se encontró la clave JWT."
                );

            var key =
                new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(jwtKey)
                );

            var credentials =
                new SigningCredentials(
                    key,
                    SecurityAlgorithms.HmacSha256
                );

            int expirationMinutes =
                int.TryParse(
                    _configuration[
                        "Jwt:ExpirationMinutes"
                    ],
                    out int minutes
                )
                    ? minutes
                    : 120;

            var token =
                new JwtSecurityToken(
                    issuer:
                        _configuration["Jwt:Issuer"],

                    audience:
                        _configuration["Jwt:Audience"],

                    claims:
                        claims,

                    expires:
                        DateTime.UtcNow.AddMinutes(
                            expirationMinutes
                        ),

                    signingCredentials:
                        credentials
                );

            return new JwtSecurityTokenHandler()
                .WriteToken(token);
        }
    }
}