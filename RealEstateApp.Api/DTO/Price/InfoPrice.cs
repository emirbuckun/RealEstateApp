using ET = RealEstateApp.Api.Entity;
using BDTO = RealEstateApp.Api.DTO.BaseDTO;

namespace RealEstateApp.Api.DTO.Price
{
  public class InfoPrice : BDTO.BaseDTO
  {
    public double Amount { get; set; }
    public int CurrencyId { get; set; }
    public string CurrencyName { get; set; }
    public string CurrencyCode { get; set; }
    public int EstateId { get; set; }
    public string EstateName { get; set; }

    public InfoPrice(ET.Price price)
    {
      Id = price.Id;
      Amount = price.Amount;
      CurrencyId = price.Currency != null ? price.Currency.Id : 0;
      CurrencyName = price.Currency != null ? price.Currency.Name ?? string.Empty : string.Empty;
      CurrencyCode = price.Currency != null ? price.Currency.Code ?? string.Empty : string.Empty;
      EstateId = price.Estate != null ? price.Estate.Id : 0;
      EstateName = price.Estate != null ? price.Estate.Name ?? string.Empty : string.Empty;
    }
  }
}