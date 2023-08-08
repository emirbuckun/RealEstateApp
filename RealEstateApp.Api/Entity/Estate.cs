namespace RealEstateApp.Api.Entity
{
  public class Estate : BaseEntity
  {
    public string? Name { get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }

    public int EstateTypeId { get; set; }
    public int EstateStatusId { get; set; }

    public EstateType? EstateType { get; set; }
    public EstateStatus? EstateStatus { get; set; }

    public ICollection<Price>? Prices { get; set; }
    public ICollection<Photo>? Photos { get; set; }
  }
}
