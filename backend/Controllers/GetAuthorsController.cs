using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("[controller]")]
public class GetAuthorsController : ControllerBase
{
    [HttpGet("AllAuthor")]
    public IEnumerable<AutorDto> GetAuthors() {        
        List<AutorDto> autors = new List<AutorDto>();
        using (ApplicationContext db = new ApplicationContext())
        {
            autors = db.Story
            .GroupBy(c => new { c.IdUser, AuthorName = c.User.Name + " " + c.User.LastName })
            .Select(g => new AutorDto {
                Id = g.Key.IdUser,
                Author = g.Key.AuthorName
            })
            .OrderBy(c => c.Author)
            .ToList();
        }
        return autors;
    }
}