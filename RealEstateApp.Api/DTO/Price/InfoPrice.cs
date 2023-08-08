using ET = RealEstateApp.Api.Entity;
using BDTO = RealEstateApp.Api.DTO.BaseDTO;

namespace RealEstateApp.Api.DTO.Price
{
  public class PriceDetail : BDTO.BaseDTO
  {
    public double Amount { get; set; }
    public string Currency { get; set; }

    public PriceDetail(ET.Price price)
    {
      Id = price.Id;
      Amount = price.Amount;
      Currency = price.Currency.Name;
    }
  }
}