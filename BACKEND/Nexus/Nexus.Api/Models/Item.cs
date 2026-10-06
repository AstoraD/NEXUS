namespace Nexus.Api.Models
{
    public class Item
    {
        public int IdItem { get; set; }

        public string Titulo { get; set; } = string.Empty;

        public string? Descripcion { get; set; }

        public string? ImagenUrl { get; set; }

        public int IdCategoria { get; set; }

        public DateTime FechaRegistro { get; set; }

        public Categoria? Categoria { get; set; }

        public ICollection<Favorito> Favoritos { get; set; } = new List<Favorito>();
    }
}