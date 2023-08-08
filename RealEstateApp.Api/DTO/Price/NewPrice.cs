using ET = RealEstateApp.Api.Entity;

namespace RealEstateApp.Api.DTO.Price
{
  public class NewPrice
  {
    public double Amount { get; set; }
    public int CurrencyId { get; set; }
    public int EstateId { get; set; }

    public ET.Price ToPrice()
    {
      return new ET.Price()
      {
        Id = 0,
        Amount = this.Amount,
        CurrencyId = this.CurrencyId,
        EstateId = this.EstateId,
      };
    }
  }
}
