using Microsoft.Extensions.Options;
using RealEstateApp.Api.Model;
using MongoDB.Driver;

namespace RealEstateApp.Api.Service
{
  public class LogService
  {
    private readonly IMongoCollection<Log> _logsCollection;

    public LogService(
        IOptions<LogDatabaseSettings> logDatabaseSettings)
    {
      var mongoClient = new MongoClient(
          logDatabaseSettings.Value.ConnectionString);

      var mongoDatabase = mongoClient.GetDatabase(
          logDatabaseSettings.Value.DatabaseName);

      _logsCollection = mongoDatabase.GetCollection<Log>(
          logDatabaseSettings.Value.CollectionName);
    }

    public async Task<List<Log>> GetAsync() =>
        await _logsCollection.Find(_ => true).ToListAsync();

    public async Task<Log?> GetAsync(string id) =>
        await _logsCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

    public async Task CreateAsync(Log newLog) =>
        await _logsCollection.InsertOneAsync(newLog);

    public async Task UpdateAsync(string id, Log updatedLog) =>
        await _logsCollection.ReplaceOneAsync(x => x.Id == id, updatedLog);

    public async Task RemoveAsync(string id) =>
        await _logsCollection.DeleteOneAsync(x => x.Id == id);
  }
}