using ET = RealEstateApp.Api.Entity;

namespace RealEstateApp.Api.DTO.EstateType
{
  public class InfoEstateType : EditEstateType
  {
    public InfoEstateType(ET.EstateType estate)
    {
      Id = estate.Id;
      Name = estate.Name;
    }
  }
}