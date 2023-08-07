using ET = RealEstateApp.Api.Entity;
using BDTO = RealEstateApp.Api.DTO.BaseDTO;

namespace RealEstateApp.Api.DTO.Estate
{
  public class EstateTypeDetail : BDTO.BaseDTO
  {
    public string Name { get; set; }

    public EstateTypeDetail(ET.Estate estate)
    {
      Id = estate.Id;
      Name = estate.Name;
    }
  }
}