namespace RealEstateApp.Api.Entity
{
  public class Price : BaseEntity
  {
    public double Amount { get; set; }
    public int CurrencyId { get; set; }
    public Currency Currency { get; set; }

    public Price()
    {
      Currency = new Currency();
    }
  }
}
