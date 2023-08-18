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
      if (estate.Photos != null && estate.Photos.Any())
      {
        var firstPhoto = estate.Photos.FirstOrDefault(x => !x.IsDeleted) ?? new ET.Photo();
        Photo = new InfoPhoto(firstPhoto);
      }
      if (estate.Prices != null && estate.Prices.Count > 0)
      {
        var firstPrice = estate.Prices.FirstOrDefault(x => !x.IsDeleted) ?? new ET.Price();
        Price = new InfoPrice(firstPrice);
      }
    }
  }
}