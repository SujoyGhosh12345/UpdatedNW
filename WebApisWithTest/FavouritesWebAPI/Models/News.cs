using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace FavouritesWebAPI.Models
{
    public class News
    {
        [BsonId]
        public ObjectId Id { get; set; }
        public string username {  get; set; }
        public string title { get; set; }
        public string author { get; set; }
        public string description { get; set; }
        public string urlToImage { get; set; }
    }
}
