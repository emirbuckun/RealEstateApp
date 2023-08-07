using ET = RealEstateApp.Api.Entity;
using BDTO = RealEstateApp.Api.DTO.BaseDTO;

namespace RealEstateApp.Api.DTO.BookDto
{
  public class EditCurrency : BDTO.BaseDTO
  {
    public string Name { get; set; }
    public string Code { get; set; }

    public EditCurrency()
    {
      Name = string.Empty;
      Code = string.Empty;
    }

    public ET.Currency ToCurrency()
    {
      return new ET.Currency()
      {
        Id = this.Id,
        Name = this.Name,
        Code = this.Code,
      };
    }
  }
}
