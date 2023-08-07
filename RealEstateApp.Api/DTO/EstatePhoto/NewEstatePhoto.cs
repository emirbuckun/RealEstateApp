using ET = RealEstateApp.Api.Entity;

namespace RealEstateApp.Api.DTO.EstatePhoto
{
  public class NewEstatePhoto
  {
    public byte[] Bytes { get; set; }
    public string Description { get; set; }
    public string FileExtension { get; set; }
    public decimal Size { get; set; }
    public int EstateId { get; set; }

    public NewEstatePhoto()
    {
      Bytes = Array.Empty<byte>();
      Description = string.Empty;
      FileExtension = string.Empty;
    }

    public ET.EstatePhoto ToEstatePhoto()
    {
      return new ET.EstatePhoto()
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
