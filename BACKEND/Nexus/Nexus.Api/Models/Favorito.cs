namespace Nexus.Api.Models
{
    public class Favorito
    {
        public int IdFavorito { get; set; }

        public int IdUsuario { get; set; }

        public int IdItem { get; set; }

        public DateTime FechaRegistro { get; set; }

        public Usuario? Usuario { get; set; }

        public Item? Item { get; set; }
    }
}