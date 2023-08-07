using ET = RealEstateApp.Api.Entity;

namespace RealEstateApp.Api.DTO.BookDto
{
  public class NewEstatePrice
  {
    public double Amount { get; set; }
    public int CurrencyId { get; set; }

    public ET.EstatePrice ToEstatePrice()
    {
      return new ET.EstatePrice()
      {
        Id = 0,
        Amount = this.Amount,
        CurrencyId = this.CurrencyId,
      };
    }
  }
}
