using RealEstateApp.Api.Entity;
using Microsoft.EntityFrameworkCore;

namespace RealEstateApp.Api.DatabaseContext
{
  public class RealEstateContext : DbContext
  {
    public virtual DbSet<Estate> Estates { get; set; }
    public virtual DbSet<EstateType> EstateTypes { get; set; }
    public virtual DbSet<EstateStatus> EstateStatuses { get; set; }
    public virtual DbSet<Price> Prices { get; set; }
    public virtual DbSet<Photo> Photos { get; set; }
    public virtual DbSet<Currency> Currencies { get; set; }
    public RealEstateContext(DbContextOptions<RealEstateContext> opt) : base(opt) { }
  }
}
