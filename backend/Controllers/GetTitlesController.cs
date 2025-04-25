using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[controller]")]
public class GetTitlesController : ControllerBase
{
    [HttpPost]
    public IEnumerable<BookDto> SearchBooks([FromForm] BookDto query) {
    using (ApplicationContext db = new ApplicationContext()) {
        var books = db.Story
            .Where(c => c.Title.ToLower().Contains(query.Title.ToLower()?? string.Empty))  // Поиск по подстроке
            .Select(c => new BookDto {
                Id = c.Id,
                Title = c.Title,
                Author = c.User.Name+" "+c.User.LastName
            })
            .ToList();

        return books;
    }
}
}