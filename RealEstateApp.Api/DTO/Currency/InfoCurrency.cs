using ET = RealEstateApp.Api.Entity;

namespace RealEstateApp.Api.DTO.Currency
{
  public class InfoCurrency : EditCurrency
  {
    public InfoCurrency(ET.Currency currency)
    {
      Id = currency.Id;
      Name = currency.Name;
      Code = currency.Code;
    }
  }
}