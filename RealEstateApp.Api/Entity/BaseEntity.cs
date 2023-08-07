namespace RealEstateApp.Api.Entity
{
  public class BaseEntity
  {
    public int Id { get; set; }
    public DateTime CreatedAt { get; set; }
    // public User CreatedBy { get; set; }
    public DateTime UpdatedAt { get; set; }
    // public User UpdatedBy { get; set; }
    public bool IsDeleted { get; set; }
  }
}