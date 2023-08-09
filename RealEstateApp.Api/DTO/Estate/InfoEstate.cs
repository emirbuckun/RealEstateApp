using ET = RealEstateApp.Api.Entity;
using BDTO = RealEstateApp.Api.DTO.BaseDTO;
using RealEstateApp.Api.DTO.Photo;
using RealEstateApp.Api.DTO.Price;

namespace RealEstateApp.Api.DTO.Estate
{
  public class InfoEstate : BDTO.BaseDTO
  {
    public string Name { get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public string EstateType { get; set; }
    public string EstateStatus { get; set; }
    public InfoPhoto? Photo { get; set; }
    public InfoPrice? Price { get; set; }

    public InfoEstate(ET.Estate estate)
    {
      Id = estate.Id;
      Name = estate.Name ?? string.Empty;
      Latitude = estate.Latitude;
      Longitude = estate.Longitude;
      StartDate = estate.StartDate;
      EndDate = estate.EndDate;
      EstateType = estate.EstateType != null ? estate.EstateType.Name ?? string.Empty : string.Empty;
      EstateStatus = estate.EstateStatus != null ? estate.EstateStatus.Name ?? string.Empty : string.Empty;
      Photo = estate.Photos != null && estate.Photos.Where(x => !x.IsDeleted).Any() ? new InfoPhoto(estate.Photos.Where(x => !x.IsDeleted).FirstOrDefault()) : null;
      Price = estate.Prices != null && estate.Prices.Where(x => !x.IsDeleted).Any() ? new InfoPrice(estate.Prices.Where(x => !x.IsDeleted).FirstOrDefault()) : null;
    }
  }
}