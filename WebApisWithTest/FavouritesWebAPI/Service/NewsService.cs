using FavouritesWebAPI.Models;
using FavouritesWebAPI.Service;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;

namespace FavouritesWebAPI.Service
{
    public class NewsService : INewsService
    {

        private readonly IMongoCollection<News> _newsCollection;
        public NewsService(IOptions<NewsDbDatabaseSettings> newsdbDatabaseSettings)
        {
            var mongoClient = new MongoClient(
                newsdbDatabaseSettings.Value.ConnectionString
                );

            var mongoDatabase = mongoClient.GetDatabase(
                newsdbDatabaseSettings.Value.DatabaseName
                );

            _newsCollection = mongoDatabase.GetCollection<News>(
                newsdbDatabaseSettings.Value.NewsCollectionName
                );

        }

        public Task CreateAsync(News news)
        {
            return _newsCollection.InsertOneAsync(news);
        }

        public Task<News?> GetAsync(string username)
        {
            return _newsCollection.Find(x => x.username == username).FirstOrDefaultAsync();
        }

        public Task<News?> GetAsyncTitle(string title)
        {
            return _newsCollection.Find(x => x.title == title).FirstOrDefaultAsync();
        }

        public Task<List<News>> GetFavBooksByUsername(string username)
        {
            return _newsCollection.Find(x => x.username == username).ToListAsync();
        }
        public Task RemoveAsync(ObjectId id)
        {
            return _newsCollection.DeleteOneAsync(x => x.Id == id);
        }
    }
}
