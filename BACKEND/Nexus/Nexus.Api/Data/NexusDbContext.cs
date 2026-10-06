using Microsoft.EntityFrameworkCore;
using Nexus.Api.Models;

namespace Nexus.Api.Data
{
    public class NexusDbContext : DbContext
    {
        public NexusDbContext(DbContextOptions<NexusDbContext> options)
            : base(options)
        {
        }

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Categoria> Categorias { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<Favorito> Favoritos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Usuario>()
                .HasKey(u => u.IdUsuario);

            modelBuilder.Entity<Categoria>()
                .HasKey(c => c.IdCategoria);

            modelBuilder.Entity<Item>()
                .HasKey(i => i.IdItem);

            modelBuilder.Entity<Favorito>()
                .HasKey(f => f.IdFavorito);

            modelBuilder.Entity<Usuario>()
                .HasIndex(u => u.Correo)
                .IsUnique();

            modelBuilder.Entity<Categoria>()
                .HasIndex(c => c.Nombre)
                .IsUnique();

            modelBuilder.Entity<Item>()
                .HasOne(i => i.Categoria)
                .WithMany(c => c.Items)
                .HasForeignKey(i => i.IdCategoria);

            modelBuilder.Entity<Favorito>()
                .HasOne(f => f.Usuario)
                .WithMany(u => u.Favoritos)
                .HasForeignKey(f => f.IdUsuario);

            modelBuilder.Entity<Favorito>()
                .HasOne(f => f.Item)
                .WithMany(i => i.Favoritos)
                .HasForeignKey(f => f.IdItem);

            modelBuilder.Entity<Favorito>()
                .HasIndex(f => new { f.IdUsuario, f.IdItem })
                .IsUnique();
        }
    }
}