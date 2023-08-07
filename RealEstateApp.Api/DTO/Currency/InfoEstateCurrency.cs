using ET = RealEstateApp.Api.Entity;

namespace RealEstateApp.Api.DTO.Currency
{
  public class InfoEstateCurrency : EditCurrency
  {
    public InfoEstateCurrency(ET.Currency currency)
    {
      Id = currency.Id;
      Name = currency.Name;
      Code = currency.Code;
    }
  }
}