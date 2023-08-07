using ET = RealEstateApp.Api.Entity;
using BDTO = RealEstateApp.Api.DTO.BaseDTO;

namespace RealEstateApp.Api.DTO.Estate
{
  public class EstatePhotoDetail : BDTO.BaseDTO
  {
    public byte[] Bytes { get; set; }
    public string Description { get; set; }
    public string FileExtension { get; set; }
    public decimal Size { get; set; }
    public string Estate { get; set; }

    public EstatePhotoDetail()
    {
      Bytes = Array.Empty<byte>();
      Description = string.Empty;
      FileExtension = string.Empty;
      Estate = string.Empty;
    }

    public EstatePhotoDetail(ET.EstatePhoto estatePhoto)
    {
      Id = estatePhoto.Id;
      Bytes = estatePhoto.Bytes;
      Description = estatePhoto.Description;
      FileExtension = estatePhoto.FileExtension;
      Size = estatePhoto.Size;
      Estate = estatePhoto.Estate.Name;
    }
  }
}