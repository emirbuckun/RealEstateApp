using ET = RealEstateApp.Api.Entity;
using BDTO = RealEstateApp.Api.DTO.BaseDTO;

namespace RealEstateApp.Api.DTO.BookDto
{
  public class EditEstateStatus : BDTO.BaseDTO
  {
    public string Name { get; set; }

    public EditEstateStatus()
    {
      Name = string.Empty;
    }

    public ET.EstateStatus ToEstateStatus()
    {
      return new ET.EstateStatus()
      {
        Id = this.Id,
        Name = this.Name,
      };
    }
  }
}
