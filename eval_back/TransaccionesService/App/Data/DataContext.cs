
using Microsoft.EntityFrameworkCore;
using TransaccionesService.App.Models;

namespace TransaccionesService.App.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Producto> Productos { get; set; }
        public DbSet<Detalle> Detalle { get; set; }
        public DbSet<Transaccion> Transacciones { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Producto>().ToTable("productos");
            modelBuilder.Entity<Detalle>().ToTable("detalle");
            modelBuilder.Entity<Transaccion>().ToTable("transacciones");

            modelBuilder.Entity<Detalle>()
           .HasOne<Producto>(s => s.producto)
           .WithMany(a => a.detalles)
           .HasForeignKey(r => r.prod_id);

            modelBuilder.Entity<Detalle>()
           .HasOne<Transaccion>(s => s.transaccion)
           .WithMany(a => a.detalles)
           .HasForeignKey(r => r.tran_id);

            modelBuilder.Entity<Producto>()
           .HasMany<Detalle>(s => s.detalles)
           .WithOne(a => a.producto);

            modelBuilder.Entity<Transaccion>()
           .HasMany<Detalle>(s => s.detalles)
           .WithOne(a => a.transaccion);

        }

    }
}