using ET = RealEstateApp.Api.Entity;

namespace RealEstateApp.Api.DTO.Photo
{
  public class NewPhoto
  {
    public byte[] Bytes { get; set; }
    public string Description { get; set; }
    public string FileExtension { get; set; }
    public decimal Size { get; set; }
    public int EstateId { get; set; }

    public NewPhoto()
    {
      Bytes = Array.Empty<byte>();
      Description = string.Empty;
      FileExtension = string.Empty;
    }

    public ET.Photo ToPhoto()
    {
      return new ET.Photo()
      {
        Id = 0,
        Bytes = this.Bytes,
        Description = this.Description,
        FileExtension = this.FileExtension,
        Size = this.Size,
        EstateId = this.EstateId
      };
    }
  }
}
