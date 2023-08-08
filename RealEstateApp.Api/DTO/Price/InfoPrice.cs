using ET = RealEstateApp.Api.Entity;
using BDTO = RealEstateApp.Api.DTO.BaseDTO;

namespace RealEstateApp.Api.DTO.Price
{
  public class InfoPrice : BDTO.BaseDTO
  {
    public double Amount { get; set; }
    public string Currency { get; set; }

    public InfoPrice(ET.Price price)
    {
      Id = price.Id;
      Amount = price.Amount;
      Currency = price.Currency.Name;
    }
  }
}