using ET = RealEstateApp.Api.Entity;
using BDTO = RealEstateApp.Api.DTO.BaseDTO;

namespace RealEstateApp.Api.DTO.Estate
{
  public class EditEstate : BDTO.BaseDTO
  {
    public string Name { get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    // public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public int EstateTypeId { get; set; }
    public int EstateStatusId { get; set; }

    public EditEstate()
    {
      Name = string.Empty;
    }

    public ET.Estate ToEstate()
    {
      return new ET.Estate()
      {
        Id = this.Id,
        Name = this.Name,
        Latitude = this.Latitude,
        Longitude = this.Longitude,
        // StartDate = this.StartDate,
        EndDate = this.EndDate,
        EstateTypeId = this.EstateTypeId,
        EstateStatusId = this.EstateStatusId,
      };
    }
  }
}
