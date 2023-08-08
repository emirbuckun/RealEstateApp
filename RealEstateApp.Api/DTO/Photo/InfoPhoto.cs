using ET = RealEstateApp.Api.Entity;
using BDTO = RealEstateApp.Api.DTO.BaseDTO;

namespace RealEstateApp.Api.DTO.Photo
{
  public class InfoPhoto : BDTO.BaseDTO
  {
    public byte[] Bytes { get; set; }
    public string Description { get; set; }
    public string FileExtension { get; set; }
    public decimal Size { get; set; }
    public string Estate { get; set; }

    public InfoPhoto()
    {
      Bytes = Array.Empty<byte>();
      Description = string.Empty;
      FileExtension = string.Empty;
      Estate = string.Empty;
    }

    public InfoPhoto(ET.Photo photo)
    {
      Id = photo.Id;
      Bytes = photo.Bytes ?? Array.Empty<byte>();
      Description = photo.Description ?? string.Empty;
      FileExtension = photo.FileExtension ?? string.Empty;
      Size = photo.Size;
      Estate = photo.Estate != null ? photo.Estate.Name ?? string.Empty : string.Empty;
    }
  }
}