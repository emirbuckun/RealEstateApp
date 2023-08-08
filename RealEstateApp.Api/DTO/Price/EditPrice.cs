using ET = RealEstateApp.Api.Entity;
using BDTO = RealEstateApp.Api.DTO.BaseDTO;

namespace RealEstateApp.Api.DTO.Price
{
  public class EditPrice : BDTO.BaseDTO
  {
    public double Amount { get; set; }
    public int CurrencyId { get; set; }

    public ET.Price ToPrice()
    {
      return new ET.Price()
      {
        Id = this.Id,
        Amount = this.Amount,
        CurrencyId = this.CurrencyId,
      };
    }
  }
}
