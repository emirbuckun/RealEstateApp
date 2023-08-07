using ET = RealEstateApp.Api.Entity;
using BDTO = RealEstateApp.Api.DTO.BaseDTO;

namespace RealEstateApp.Api.DTO.Estate
{
  public class EstateCurrencyDetail : BDTO.BaseDTO
  {
    public string Name { get; set; }
    public string Code { get; set; }

    public EstateCurrencyDetail(ET.Currency currency)
    {
      Id = currency.Id;
      Name = currency.Name;
      Code = currency.Code;
    }
  }
}