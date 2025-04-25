using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("[controller]")]
public class GetStoryController : ControllerBase
{
    [HttpGet("PagedStoryText")]
    public IActionResult GetPagedStoryText(string storyId, int pageNumber = 1, int pageSize = 1000) 
    {        
        StoryDto? story;
        using (ApplicationContext db = new ApplicationContext())
        {
            story = db.Story
                .Where(c => c.Id.ToString() == storyId)
                .Select(c => new StoryDto
                {
                    Id = c.Id,
                    Text = c.Text,
                })
                .FirstOrDefault();
        }

        if (story == null)
        {
            return BadRequest(new { message = "История удалена или не найдена..." });
        }

        // Разбиение на страницы
        var words = story.Text.Split(' ', StringSplitOptions.RemoveEmptyEntries);
        var pagedText = words
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToArray();
        
        return Ok(new 
        {
            Text = string.Join(" ", pagedText),
            HasMore = words.Length > pageNumber * pageSize
        });
    }
    [HttpGet("Story")]
    public IActionResult GetStory(string storyId) {        
        StoryDto? story ;
        using (ApplicationContext db = new ApplicationContext())
        {
            story = db.Story.Where(c => c.Id.ToString() == storyId)
            .Select(c => new StoryDto
            {
                Id = c.Id,
                IdUser = c.IdUser,
                Author = c.User.Name + " " + c.User.LastName,
                Title = c.Title,
                Genre = c.Genre,
                Annotation = c.Annotation, 
                Picture = c.Picture,
                AddDate = c.AddDate,
                // Text = c.Text
            })
            .FirstOrDefault();
        }
        if(story == null){
            return BadRequest(new { message = "Похоже История была удалена..." });
        }       

        return Ok(story);
    }

    [HttpGet("StoryText")]
    public IActionResult GetStoryText(string storyId) {        
        StoryDto? story ;
        using (ApplicationContext db = new ApplicationContext())
        {
            story = db.Story
             .Where(c=>c.Id.ToString()==storyId)
            .Select(c => new StoryDto
            {
                Id = c.Id,
                Text= c.Text,
            }).FirstOrDefault();
        }
        if(story == null){
            return BadRequest(new { message = "Похоже История была удалена..." });
        }
        story.Text = LimitWords(story.Text, 50);
        return  Ok(story);
    }

    private string LimitWords(string text, int wordLimit)
    {
        if (string.IsNullOrWhiteSpace(text)) return text;
        
        var words = text.Split(new[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);
        
        return words.Length > wordLimit 
            ? string.Join(" ", words.Take(wordLimit)) + "..."  // Обрезаем и добавляем "..."
            : text;
    }
}