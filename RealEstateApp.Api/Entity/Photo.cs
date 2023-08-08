using Microsoft.EntityFrameworkCore;

namespace RealEstateApp.Api.Entity
{
  public class Photo : BaseEntity
  {
    public byte[]? Bytes { get; set; }
    public string? Description { get; set; }
    public string? FileExtension { get; set; }
    [Precision(18, 2)]
    public decimal Size { get; set; }

    public int EstateId { get; set; }
    public Estate? Estate { get; set; }
  }
}
