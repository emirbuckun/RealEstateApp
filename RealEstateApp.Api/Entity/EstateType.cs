namespace RealEstateApp.Api.Entity
{
  public class EstateType : BaseEntity
  {
    public string Name { get; set; }

    public EstateType()
    {
      Name = string.Empty;
    }
  }
}
