using ET = RealEstateApp.Api.Entity;
using BDTO = RealEstateApp.Api.DTO.BaseDTO;

namespace RealEstateApp.Api.DTO.EstatePrice
{
  public class EditEstatePrice : BDTO.BaseDTO
  {
    public double Amount { get; set; }
    public int CurrencyId { get; set; }

    public ET.EstatePrice ToEstatePrice()
    {
      return new ET.EstatePrice()
      {
        Id = this.Id,
        Amount = this.Amount,
        CurrencyId = this.CurrencyId,
      };
    }
  }
}
