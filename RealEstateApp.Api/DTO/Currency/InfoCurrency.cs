using ET = RealEstateApp.Api.Entity;

namespace RealEstateApp.Api.DTO.Currency
{
  public class InfoCurrency : EditCurrency
  {
    public InfoCurrency(ET.Currency currency)
    {
      Id = currency.Id;
      Name = currency.Name ?? string.Empty;
      Code = currency.Code ?? string.Empty;
    }
  }
}