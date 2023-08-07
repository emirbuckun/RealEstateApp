using ET = RealEstateApp.Api.Entity;
using BDTO = RealEstateApp.Api.DTO.BaseDTO;

namespace RealEstateApp.Api.DTO.Estate
{
  public class EstateDetail : BDTO.BaseDTO
  {
    public string Name { get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public string EstateType { get; set; }
    public string EstateStatus { get; set; }

    public EstateDetail(ET.Estate estate)
    {
      Id = estate.Id;
      Name = estate.Name;
      Latitude = estate.Latitude;
      Longitude = estate.Longitude;
      StartDate = estate.StartDate;
      EndDate = estate.EndDate;
      EstateType = estate.EstateType.Name;
      EstateStatus = estate.EstateStatus.Name;
    }
  }
}