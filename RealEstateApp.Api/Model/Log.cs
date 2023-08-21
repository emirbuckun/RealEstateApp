using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace RealEstateApp.Api.Model
{
  [BsonIgnoreExtraElements]
  public class Log
  {
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; } = string.Empty;
    public string Level { get; set; } = string.Empty;
    public string RenderedMessage { get; set; } = string.Empty;
    public DateTime UtcTimeStamp { get; set; }
  }
}