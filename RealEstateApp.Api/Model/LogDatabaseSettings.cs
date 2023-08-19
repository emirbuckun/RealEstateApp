namespace RealEstateApp.Api.Model
{
  public class LogDatabaseSettings
  {
    public string ConnectionString { get; set; } = null!;
    public string DatabaseName { get; set; } = null!;
    public string CollectionName { get; set; } = null!;
  }
}