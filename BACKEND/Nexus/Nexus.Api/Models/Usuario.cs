namespace Nexus.Api.Models
{
    public class Usuario
    {
        public int IdUsuario { get; set; }

        public string Nombre { get; set; } = string.Empty;

        public string Correo { get; set; } = string.Empty;

        public string PasswordHash { get; set; } = string.Empty;

        public string Rol { get; set; } = string.Empty;

        public DateTime FechaRegistro { get; set; }

        public ICollection<Favorito> Favoritos { get; set; } = new List<Favorito>();
    }
}