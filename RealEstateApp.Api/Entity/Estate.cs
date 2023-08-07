namespace RealEstateApp.Api.Entity
{
  public class Estate : BaseEntity
  {
    public string Name { get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }

    public int EstateTypeId { get; set; }
    public int EstateStatusId { get; set; }

    public EstateType EstateType { get; set; }
    public EstateStatus EstateStatus { get; set; }

    public ICollection<EstatePrice> EstatePrices { get; set; }

    public Estate()
    {
      Name = string.Empty;
      EstateType = new EstateType();
      EstateStatus = new EstateStatus();
      EstatePrices = new List<EstatePrice>();
    }
  }
}
