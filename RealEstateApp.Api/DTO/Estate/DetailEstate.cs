using ET = RealEstateApp.Api.Entity;
using BDTO = RealEstateApp.Api.DTO.BaseDTO;
using RealEstateApp.Api.DTO.Price;
using RealEstateApp.Api.DTO.Photo;

namespace RealEstateApp.Api.DTO.Estate
{
  public class DetailEstate : BDTO.BaseDTO
  {
    public string Name { get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public int EstateTypeId { get; set; }
    public int EstateStatusId { get; set; }
    public ICollection<InfoPhoto> Photos { get; set; }
    public ICollection<InfoPrice> Prices { get; set; }

    public DetailEstate(ET.Estate estate)
    {
      Id = estate.Id;
      Name = estate.Name ?? string.Empty;
      Latitude = estate.Latitude;
      Longitude = estate.Longitude;
      StartDate = estate.StartDate;
      EndDate = estate.EndDate;
      EstateTypeId = estate.EstateType != null ? estate.EstateType.Id : 0;
      EstateStatusId = estate.EstateStatus != null ? estate.EstateStatus.Id : 0;
      var priceList = new List<InfoPrice>();
      estate.Prices?.ToList().ForEach(x => priceList.Add(new InfoPrice(x)));
      Prices = priceList;
      var photoList = new List<InfoPhoto>();
      estate.Photos?.ToList().ForEach(x => photoList.Add(new InfoPhoto(x)));
      Photos = photoList;
    }
  }
}