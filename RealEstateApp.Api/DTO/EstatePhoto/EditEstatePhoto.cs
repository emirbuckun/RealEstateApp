using ET = RealEstateApp.Api.Entity;
using BDTO = RealEstateApp.Api.DTO.BaseDTO;

namespace RealEstateApp.Api.DTO.EstatePhoto
{
  public class EditEstatePhoto : BDTO.BaseDTO
  {
    public byte[] Bytes { get; set; }
    public string Description { get; set; }
    public string FileExtension { get; set; }
    public decimal Size { get; set; }
    public int EstateId { get; set; }

    public EditEstatePhoto()
    {
      Bytes = Array.Empty<byte>();
      Description = string.Empty;
      FileExtension = string.Empty;
    }

    public ET.EstatePhoto ToEstatePhoto()
    {
      return new ET.EstatePhoto()
      {
        Id = this.Id,
        Bytes = this.Bytes,
        Description = this.Description,
        FileExtension = this.FileExtension,
        Size = this.Size,
        EstateId = this.EstateId
      };
    }
  }
}
