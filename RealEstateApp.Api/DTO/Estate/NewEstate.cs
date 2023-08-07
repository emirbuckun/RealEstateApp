using ET = RealEstateApp.Api.Entity;

namespace RealEstateApp.Api.DTO.Estate
{
  public class NewEstate
  {
    public string Name { get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public int EstateTypeId { get; set; }
    public int EstateStatusId { get; set; }

    public NewEstate()
    {
      Name = string.Empty;
    }

    public ET.Estate ToEstate()
    {
      return new ET.Estate()
      {
        Id = 0,
        Name = this.Name,
        Latitude = this.Latitude,
        Longitude = this.Longitude,
        StartDate = this.StartDate,
        EndDate = this.EndDate,
        EstateTypeId = this.EstateTypeId,
        EstateStatusId = this.EstateStatusId,
      };
    }
  }
}
