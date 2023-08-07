using ET = RealEstateApp.Api.Entity;

namespace RealEstateApp.Api.DTO.BookDto
{
  public class NewEstateType
  {
    public string Name { get; set; }

    public NewEstateType()
    {
      Name = string.Empty;
    }

    public ET.EstateType ToEstateType()
    {
      return new ET.EstateType()
      {
        Id = 0,
        Name = this.Name,
      };
    }
  }
}
