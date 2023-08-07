using ET = RealEstateApp.Api.Entity;
using BDTO = RealEstateApp.Api.DTO.BaseDTO;

namespace RealEstateApp.Api.DTO.Estate
{
  public class EstatePriceDetail : BDTO.BaseDTO
  {
    public double Amount { get; set; }
    public string Currency { get; set; }

    public EstatePriceDetail(ET.EstatePrice estatePrice)
    {
      Id = estatePrice.Id;
      Amount = estatePrice.Amount;
      Currency = estatePrice.Currency.Name;
    }
  }
}