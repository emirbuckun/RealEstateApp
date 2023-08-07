namespace RealEstateApp.Api.Entity
{
  public class EstatePrice : BaseEntity
  {
    public double Amount { get; set; }
    public Currency Currency { get; set; }

    public EstatePrice()
    {
      Currency = new Currency();
    }
  }
}
