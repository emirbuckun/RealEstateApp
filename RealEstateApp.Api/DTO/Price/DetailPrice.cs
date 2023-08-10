using ET = RealEstateApp.Api.Entity;
using BDTO = RealEstateApp.Api.DTO.BaseDTO;

namespace RealEstateApp.Api.DTO.Price
{
  public class DetailPrice : BDTO.BaseDTO
  {
    public double Amount { get; set; }
    public int CurrencyId { get; set; }
    public int EstateId { get; set; }

    public DetailPrice(ET.Price price)
    {
      Id = price.Id;
      Amount = price.Amount;
      CurrencyId = price.Currency != null ? price.Currency.Id : 0;
      EstateId = price.Estate != null ? price.Estate.Id : 0;
    }
  }
}