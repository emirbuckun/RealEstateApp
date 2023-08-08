using RealEstateApp.Api.Entity;
using Microsoft.EntityFrameworkCore;

namespace RealEstateApp.Api.DatabaseContext
{
  public class RealEstateContext : DbContext
  {
    public DbSet<Estate> Estates { get; set; }
    public DbSet<EstateType> EstateTypes { get; set; }
    public DbSet<EstateStatus> EstateStatuses { get; set; }
    public DbSet<Price> Prices { get; set; }
    public DbSet<Photo> Photos { get; set; }
    public DbSet<Currency> Currencies { get; set; }
    public RealEstateContext(DbContextOptions<RealEstateContext> opt) : base(opt) { }
  }
}
