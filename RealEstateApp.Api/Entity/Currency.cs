namespace RealEstateApp.Api.Entity
{
  public class Currency : BaseEntity
  {
    public string Name { get; set; }
    public string Code { get; set; }

    public Currency()
    {
      Name = string.Empty;
      Code = string.Empty;
    }
  }
}
