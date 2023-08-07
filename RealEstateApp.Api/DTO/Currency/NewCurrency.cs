using ET = RealEstateApp.Api.Entity;

namespace RealEstateApp.Api.DTO.Currency
{
  public class NewCurrency
  {
    public string Name { get; set; }
    public string Code { get; set; }

    public NewCurrency()
    {
      Name = string.Empty;
      Code = string.Empty;
    }

    public ET.Currency ToCurrency()
    {
      return new ET.Currency()
      {
        Id = 0,
        Name = this.Name,
        Code = this.Code,
      };
    }
  }
}
