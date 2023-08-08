using Microsoft.AspNetCore.Identity;

namespace RealEstateApp.Api.Entity
{
  public class BaseEntity
  {
    public int Id { get; set; }
    public DateTime CreatedAt { get; set; }
    public string? CreatedBy { get; set; }
    public DateTime UpdatedAt { get; set; }
    public string? UpdatedBy { get; set; }
    public bool IsDeleted { get; set; }
  }
}