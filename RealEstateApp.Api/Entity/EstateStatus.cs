namespace RealEstateApp.Api.Entity
{
  public class EstateStatus : BaseEntity
  {
    public string Name { get; set; }

    public EstateStatus()
    {
      Name = string.Empty;
    }
  }
}
