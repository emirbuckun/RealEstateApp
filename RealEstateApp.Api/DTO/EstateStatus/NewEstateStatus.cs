using ET = RealEstateApp.Api.Entity;

namespace RealEstateApp.Api.DTO.BookDto
{
  public class NewEstateStatus
  {
    public string Name { get; set; }

    public NewEstateStatus()
    {
      Name = string.Empty;
    }

    public ET.EstateStatus ToEstateStatus()
    {
      return new ET.EstateStatus()
      {
        Id = 0,
        Name = this.Name,
      };
    }
  }
}
