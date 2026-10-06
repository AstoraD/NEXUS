namespace Nexus.Api.DTOs
{
    public class ItemRequest
    {
        public string Titulo { get; set; } = string.Empty;
        public string? Descripcion { get; set; }
        public string? ImagenUrl { get; set; }
        public int IdCategoria { get; set; }
    }
}