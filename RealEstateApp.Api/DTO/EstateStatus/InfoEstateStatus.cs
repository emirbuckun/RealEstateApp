using ET = RealEstateApp.Api.Entity;
using RealEstateApp.Api.DTO.EstateStatus;

namespace RealEstateApp.Api.DTO.Estate
{
  public class InfoEstateStatus : EditEstateStatus
  {
    public InfoEstateStatus(ET.EstateStatus estateStatus)
    {
      Id = estateStatus.Id;
      Name = estateStatus.Name;
    }
  }
}