using ET = RealEstateApp.Api.Entity;
using BDTO = RealEstateApp.Api.DTO.BaseDTO;

namespace RealEstateApp.Api.DTO.Estate
{
  public class EstateStatusDetail : BDTO.BaseDTO
  {
    public string Name { get; set; }

    public EstateStatusDetail(ET.EstateStatus estateStatus)
    {
      Id = estateStatus.Id;
      Name = estateStatus.Name;
    }
  }
}