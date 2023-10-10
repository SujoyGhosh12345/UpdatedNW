using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using FavouritesWebAPI.Service;
using FavouritesWebAPI.Models;
using MongoDB.Bson.IO;
using MongoDB.Bson;

namespace FavouritesWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewsController : ControllerBase
    {

        private readonly INewsService _newsService;

        public NewsController(INewsService newsService)
        {
            _newsService = newsService;
        }
        [HttpGet("{username}")]
        public async Task<ActionResult<List<News>>> Get(string username)
        {
            return await _newsService.GetFavBooksByUsername(username);
        }

        [HttpPost]
        public async Task<ActionResult> Create(News newNews)
        {
            await _newsService.CreateAsync(newNews);
            return Ok(newNews);
        }

        //[HttpGet]
        //public async Task<ActionResult<List<News>>> Get()=> 
        //    await _newsService.GetAsync();




        [HttpDelete]
        public async Task<ActionResult> Delete(string username, string title)
        {
            var news = await _newsService.GetAsync(username);
            if (news is null)
            {
                return NotFound();
            }
            var news1 = await _newsService.GetAsyncTitle(title);
            if (news1 is null)
            {
                return NotFound();
            }
            await _newsService.RemoveAsync(news1.Id);


            return NoContent();
        }

    }
}
