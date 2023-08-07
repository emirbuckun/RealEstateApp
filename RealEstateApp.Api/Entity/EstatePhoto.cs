namespace RealEstateApp.Api.Entity
{
  public class EstatePhoto : BaseEntity
  {
    public byte[] Bytes { get; set; }
    public string Description { get; set; }
    public string FileExtension { get; set; }
    public decimal Size { get; set; }

    public int EstateId { get; set; }
    public Estate Estate { get; set; }

    public EstatePhoto()
    {
      Bytes = Array.Empty<byte>();
      Description = string.Empty;
      FileExtension = string.Empty;
      Estate = new Estate();
    }
  }
}
