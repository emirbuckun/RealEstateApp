using ET = RealEstateApp.Api.Entity;
using BDTO = RealEstateApp.Api.DTO.BaseDTO;

namespace RealEstateApp.Api.DTO.BookDto
{
  public class EditEstateType : BDTO.BaseDTO
  {
    public string Name { get; set; }

    public EditEstateType()
    {
      Name = string.Empty;
    }

    public ET.EstateType ToEstateType()
    {
      return new ET.EstateType()
      {
        Id = this.Id,
        Name = this.Name,
      };
    }
  }
}
