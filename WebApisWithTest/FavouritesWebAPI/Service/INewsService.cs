using FavouritesWebAPI.Models;
using MongoDB.Bson;

namespace FavouritesWebAPI.Service
{
    public interface INewsService
    {
        Task CreateAsync (News News);
        Task<News> GetAsync(string username);
        Task<News> GetAsyncTitle(string title);
        Task <List<News>> GetFavBooksByUsername(string username);
        Task RemoveAsync(ObjectId id);
       
    }
}