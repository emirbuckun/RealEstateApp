using ET = RealEstateApp.Api.Entity;
using RealEstateApp.Api.DTO.EstateType;

namespace RealEstateApp.Api.DTO.Estate
{
  public class InfoEstateType : EditEstateType
  {
    public InfoEstateType(ET.Estate estate)
    {
      Id = estate.Id;
      Name = estate.Name;
    }
  }
}