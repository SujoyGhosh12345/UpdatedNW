
namespace RecommendationWebAPI.Models
{
    public class News
    {
        public string Title { get; set; }
        public string Author { get; set; }
        public string URLToImage { get; set; }

        public string Description { get; set; }
        public DateTime PublishedAt { get; set; }

    }
}
