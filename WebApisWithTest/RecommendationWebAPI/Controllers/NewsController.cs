using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RecommendationWebAPI.Models;
using RecommendationWebAPI;
using NewsAPI.Models;
using NewsAPI.Constants;
using RecommendationWebAPI.Models;
using NewsAPI;

namespace RecommendationWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewsController : ControllerBase
    {
        [HttpGet]
        public News[] GetNews()
        {
            List<News> news = new List<News>();
            var newsApiClient = new NewsApiClient("c1ceb7c1ee5f4b3480fde05b5a47b242");
            var articlesResponse = newsApiClient.GetEverything(new EverythingRequest
            {
                Q = "Top",
                SortBy = SortBys.Popularity,
                Language = Languages.EN,
                //From = new DateTime(2023 - 10 - 05)
            });

            if (articlesResponse.Status == Statuses.Ok)
            {
                foreach (var article in articlesResponse.Articles)
                {
                    news.Add(new News { Title = article.Title, Author = article.Author, URLToImage = article.UrlToImage, Description=article.Description, PublishedAt = (DateTime)article.PublishedAt });

                }
            }
            return news.ToArray();
        }
    }
}
