using ET = RealEstateApp.Api.Entity;

namespace RealEstateApp.Api.DTO.EstateStatus
{
  public class InfoEstateStatus : EditEstateStatus
  {
    public InfoEstateStatus(ET.EstateStatus estateStatus)
    {
      Id = estateStatus.Id;
      Name = estateStatus.Name ?? string.Empty;
    }
  }
}