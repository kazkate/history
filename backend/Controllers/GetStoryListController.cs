using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("[controller]")]
public class GetStoryListController : ControllerBase
{
    [HttpGet("AllStories")]
    public IEnumerable<StoryDto> GetStories() {        
        List<StoryDto> stories = new List<StoryDto>();
        using (ApplicationContext db = new ApplicationContext())
        {
            stories = db.Story.Select(c => new StoryDto
            {
                Id = c.Id,
                IdUser = c.IdUser,
                Author = c.User.Name + " " + c.User.LastName,
                Title = c.Title,
                Genre = c.Genre,
                Annotation = c.Annotation, 
                Picture = c.Picture,
                AddDate = c.AddDate
            }).OrderByDescending(c=>c.AddDate).ToList();
        }
        return stories;
    }

    [HttpPost("FilterdedByAuthorStories")]
    public IEnumerable<StoryDto> GetStoriesFilterByAuthor([FromForm] FilterDto storyRequest) {        
        List<StoryDto> stories = new List<StoryDto>();
        User? author;
        using (ApplicationContext db = new ApplicationContext())
        {
            author = db.Users.FirstOrDefault(c=>c.Name+" "+c.LastName == storyRequest.Author);
            stories = db.Story.Where(c=>c.IdUser==author.Id).
            Select(c => new StoryDto
            {
                Id = c.Id,
                IdUser = c.IdUser,
                Author = c.User.Name + " " + c.User.LastName,
                Title = c.Title,
                Genre = c.Genre,
                Annotation = c.Annotation, 
                Picture = c.Picture,
                AddDate = c.AddDate
            }).OrderByDescending(c=>c.AddDate).ToList();
        }
        return stories;
    }

    [HttpPost("FilterdedByTitleStories")]
    public IEnumerable<StoryDto> GetStoriesFilterByTitle([FromForm] FilterDto storyRequest) {        
        List<StoryDto> stories = new List<StoryDto>();
        
        using (ApplicationContext db = new ApplicationContext())
        {           
            stories = db.Story.Where(c=>c.Title==storyRequest.Title).
            Select(c => new StoryDto
            {
                Id = c.Id,
                IdUser = c.IdUser,
                Author = c.User.Name + " " + c.User.LastName,
                Title = c.Title,
                Genre = c.Genre,
                Annotation = c.Annotation, 
                Picture = c.Picture,
                AddDate = c.AddDate
            }).OrderByDescending(c=>c.AddDate).ToList();
        }
        return stories;
    }

    [HttpPost("FilterdedByGenreStories")]
    public IEnumerable<StoryDto> GetStoriesFilterByGenre([FromForm] FilterDto storyRequest) {        
        List<StoryDto> stories = new List<StoryDto>();       
        using (ApplicationContext db = new ApplicationContext())
        {            
            stories = db.Story.Where(c=>c.Genre==storyRequest.Genre).
            Select(c => new StoryDto
            {
                Id = c.Id,
                IdUser = c.IdUser,
                Author = c.User.Name + " " + c.User.LastName,
                Title = c.Title,
                Genre = c.Genre,
                Annotation = c.Annotation, 
                Picture = c.Picture,
                AddDate = c.AddDate
            }).OrderByDescending(c=>c.AddDate).ToList();
        }
        return stories;
    }

    [HttpPost("FilterdedBySymbolsStories")]
    public IEnumerable<StoryDto> GetStoriesFilterBySymbols([FromForm] FilterDto storyRequest) {  
        // List<StoryDto> stories = new List<StoryDto>(); 

    // Значения по умолчанию
    int min = storyRequest.MinSymbols ?? 0;
    int max = storyRequest.MaxSymbols ?? int.MaxValue; 

    using (ApplicationContext db = new ApplicationContext())
    {            
        Console.WriteLine($"Фильтр по словам: min = {min}, max = {max}");

        // Загружаем данные в память
        var storyList = db.Story
            .Include(c => c.User) // Загружаем автора
            .ToList(); // ВАЖНО: Загружаем в память перед фильтрацией!

        Console.WriteLine($"Всего историй в базе: {storyList.Count}");

        // Фильтруем по количеству слов
        var filteredStories = storyList
            .Where(c => !string.IsNullOrWhiteSpace(c.Text)) // Исключаем null и пустые строки
            .Where(c => 
            {
                int wordCount = CountWords(c.Text);
                return wordCount >= min && wordCount <= max;
            })
            .ToList();

        Console.WriteLine($"Историй после фильтрации: {filteredStories.Count}");

        // Преобразуем в DTO
        var stories = filteredStories
            .Select(c => new StoryDto
            {
                Id = c.Id,
                IdUser = c.IdUser ?? 0,
                Author = c.User != null ? $"{c.User.Name} {c.User.LastName}" : "Неизвестный автор",
                Title = c.Title,
                Genre = c.Genre,
                Annotation = c.Annotation, 
                Picture = c.Picture,
                AddDate = c.AddDate
            })
            .OrderByDescending(c => c.AddDate)
            .ToList();

        return stories;
        }
    //     // Загружаем данные в память, чтобы можно было считать слова
    //     var storyList = db.Story
    //         .Include(c => c.User) // Включаем автора, чтобы избежать NullReferenceException
    //         .ToList();

    //     // Фильтруем по количеству слов уже в памяти
    //     stories = storyList
    //         .Where(c => !string.IsNullOrWhiteSpace(c.Text)) // Исключаем null
    //         .Where(c => CountWords(c.Text) >= min && CountWords(c.Text) <= max)
    //         .Select(c => new StoryDto
    //         {
    //             Id = c.Id,
    //             IdUser = c.IdUser ?? 0,
    //             Author = c.User != null ? $"{c.User.Name} {c.User.LastName}" : "Неизвестный автор",
    //             Title = c.Title,
    //             Genre = c.Genre,
    //             Annotation = c.Annotation, 
    //             Picture = c.Picture,
    //             AddDate = c.AddDate
    //         })
    //         .OrderByDescending(c => c.AddDate)
    //         .ToList();
    // }

    // return stories;      
        // List<StoryDto> stories = new List<StoryDto>(); 
        // int min=0;
        // int max = 30000;
        // if(storyRequest.MinSymbols!=null)   {
        //     min= (int)storyRequest.MinSymbols;
        // } 
        // if(storyRequest.MaxSymbols!=null){
        //     max=(int)storyRequest.MaxSymbols;
        // }
        // using (ApplicationContext db = new ApplicationContext())
        // {            
        //     stories = db.Story.Where(c=>c.Text.Length>=min&&c.Text.Length<=max).
        //     Select(c => new StoryDto
        //     {
        //         Id = c.Id,
        //         IdUser = c.IdUser,
        //         Author = c.User.Name + " " + c.User.LastName,
        //         Title = c.Title,
        //         Genre = c.Genre,
        //         Annotation = c.Annotation, 
        //         Picture = c.Picture,
        //         AddDate = c.AddDate
        //     }).OrderByDescending(c=>c.AddDate).ToList();
        // }
        // return stories;
    }

    [HttpPost("FilterdedByPicturesStories")]
    public IEnumerable<StoryDto> GetStoriesFilterByPictures([FromForm] FilterDto storyRequest) {        
        List<StoryDto> stories = new List<StoryDto>();
        
        using (ApplicationContext db = new ApplicationContext())
        {   
            if(storyRequest.Pictures=="есть"){        
                stories = db.Story.Where(c=>c.Picture!=null).
                Select(c => new StoryDto
                {
                    Id = c.Id,
                    IdUser = c.IdUser,
                    Author = c.User.Name + " " + c.User.LastName,
                    Title = c.Title,
                    Genre = c.Genre,
                    Annotation = c.Annotation, 
                    Picture = c.Picture,
                    AddDate = c.AddDate
                }).OrderByDescending(c=>c.AddDate).ToList();
            }
            else if(storyRequest.Pictures=="нет"){
                stories = db.Story.Where(c=>c.Picture==null).
                Select(c => new StoryDto
                {
                    Id = c.Id,
                    IdUser = c.IdUser,
                    Author = c.User.Name + " " + c.User.LastName,
                    Title = c.Title,
                    Genre = c.Genre,
                    Annotation = c.Annotation, 
                    Picture = c.Picture,
                    AddDate = c.AddDate
                }).OrderByDescending(c=>c.AddDate).ToList();
            }
            else{
                stories = db.Story.Select(c => new StoryDto
                {
                    Id = c.Id,
                    IdUser = c.IdUser,
                    Author = c.User.Name + " " + c.User.LastName,
                    Title = c.Title,
                    Genre = c.Genre,
                    Annotation = c.Annotation, 
                    Picture = c.Picture,
                    AddDate = c.AddDate
                }).OrderByDescending(c=>c.AddDate).ToList();
            }
        }
        return stories;
    }

    [HttpPost("FilterdedByAllParametrsStories")]
    public IEnumerable<StoryDto> GetStoriesFilterByAllParametrs([FromForm] FilterDto storyRequest) {        
        // List<StoryDto> stories = new List<StoryDto>();
        // User? author;
        // int min=0;
        // int max = 30000;
        // if(storyRequest.MinSymbols!=null)   {
        //     min= (int)storyRequest.MinSymbols;
        // } 
        // if(storyRequest.MaxSymbols!=null){
        //     max=(int)storyRequest.MaxSymbols;
        // }
        using (ApplicationContext db = new ApplicationContext())
        {   
        //       int min = 0;
        // int max = 30000;
        
        // // Устанавливаем минимальное и максимальное количество слов
        // if (storyRequest.MinSymbols != null) {
        //     min = (int)storyRequest.MinSymbols;
        // } 
        // if (storyRequest.MaxSymbols != null) {
        //     max = (int)storyRequest.MaxSymbols;
        // }
        int min = storyRequest.MinSymbols ?? 0;
        int max = storyRequest.MaxSymbols ?? 1000000;

          // Начинаем формировать запрос
        IQueryable<Story> query = db.Story.Include(c => c.User);

        // Фильтр по автору, если указан
        if (!string.IsNullOrWhiteSpace(storyRequest.Author)) {
            // Разделяем имя и фамилию
            var authorNameParts = storyRequest.Author.Split(' ', StringSplitOptions.RemoveEmptyEntries);
            if (authorNameParts.Length == 2) {
                var firstName = authorNameParts[0];
                var lastName = authorNameParts[1];

                // Найдем пользователя с указанным именем и фамилией
                var author = db.Users.FirstOrDefault(c => c.Name == firstName && c.LastName == lastName);
                if (author != null) {
                    query = query.Where(c => c.IdUser == author.Id);
                }
            }
        }

        // Фильтр по жанру, если указан
        if (!string.IsNullOrWhiteSpace(storyRequest.Genre)) {
            query = query.Where(c => c.Genre == storyRequest.Genre);
        }

        // Фильтрация по количеству слов
        // query = query.Where(c => CountWords(c.Text) >= min && CountWords(c.Text) <= max);

        // Фильтрация по наличию картинки
        if (storyRequest.Pictures == "есть") {
            query = query.Where(c => c.Picture != "base.jpg");
        } else if (storyRequest.Pictures == "нет") {
            query = query.Where(c => c.Picture == "base.jpg");
        }

        // Получаем все данные, а затем фильтруем по количеству слов на клиенте
    //    var stories = query
    //         .AsEnumerable()  // Переводим запрос в память
    //         .Where(c => CountWords(c.Text) >= min && CountWords(c.Text) <= max)  // Фильтрация по количеству слов
    //         .Select(c => new StoryDto {
    //             Id = c.Id,
    //             IdUser = c.IdUser,
    //             Author = c.User.Name + " " + c.User.LastName,  // Используем уже точно существующего пользователя
    //             Title = c.Title,
    //             Genre = c.Genre,
    //             Annotation = c.Annotation,
    //             Picture = c.Picture,
    //             AddDate = c.AddDate
    //         })
    //         .OrderByDescending(c => c.AddDate)
    //         .ToList();
            // var stories = query
            // .AsEnumerable()
            // .Where(c => !string.IsNullOrWhiteSpace(c.Text) && CountWords(c.Text) >= min && CountWords(c.Text) <= max) // Проверяем, что Text не null
            // .Select(c => new StoryDto
            // {
            //     Id = c.Id,
            //     IdUser = c.IdUser ?? 0, // Защита от null
            //     Author = c.User != null ? $"{c.User.Name} {c.User.LastName}" : "Неизвестный автор", // Проверяем User
            //     Title = c.Title,
            //     Genre = c.Genre,
            //     Annotation = c.Annotation,
            //     Picture = c.Picture,
            //     AddDate = c.AddDate
            // })
            // .OrderByDescending(c => c.AddDate)
            // .ToList();
            var storiesList = query.ToList(); // ВАЖНО!
            var filteredStories = storiesList
            .Where(c => !string.IsNullOrWhiteSpace(c.Text))
            .Where(c => CountWords(c.Text) >= min && CountWords(c.Text) <= max)
            .Select(c => new StoryDto
            {
                Id = c.Id,
                IdUser = c.IdUser ?? 0,
                Author = c.User != null ? $"{c.User.Name} {c.User.LastName}" : "Неизвестный автор",
                Title = c.Title,
                Genre = c.Genre,
                Annotation = c.Annotation,
                Picture = c.Picture,
                AddDate = c.AddDate
            })
            .OrderByDescending(c => c.AddDate)
            .ToList();

        return filteredStories;
    }
}

// Метод для подсчета количества слов в строке
private int CountWords(string text)
{
    if (string.IsNullOrWhiteSpace(text))
        return 0;

    // Разделяем текст по пробелам и подсчитываем количество слов
   var words = text.Split(new[] { ' ', '\n', '\r', '\t' }, StringSplitOptions.RemoveEmptyEntries);
    Console.WriteLine($"Text: {text.Substring(0, Math.Min(text.Length, 50))}... | Words: {words.Length}"); // Логирование
    return words.Length;
}
        //     // int min = storyRequest.MinSymbols ?? 0;
        //     // int max = storyRequest.MaxSymbols ?? 30000;
        //     int min=0;
        //     int max = 30000;
        //     if(storyRequest.MinSymbols!=null)   {
        //         min= (int)storyRequest.MinSymbols;
        //     } 
        //     if(storyRequest.MaxSymbols!=null){
        //         max=(int)storyRequest.MaxSymbols;
        //     }

        //     // Начинаем формировать запрос
        //     IQueryable<Story> query = db.Story;

        //     // Фильтр по автору, если указан
        //     if (!string.IsNullOrWhiteSpace(storyRequest.Author)) {
        //         var author = db.Users.FirstOrDefault(c => c.Name + " " + c.LastName == storyRequest.Author);
        //         if (author != null) {
        //             query = query.Where(c => c.IdUser == author.Id);
        //         }
        //     }

        //     // Фильтр по жанру, если указан
        //     if (!string.IsNullOrWhiteSpace(storyRequest.Genre)) {
        //         query = query.Where(c => c.Genre == storyRequest.Genre);
        //     }

        //     // Фильтр по длине текста
        //     query = query.Where(c => c.Text.Length >= min && c.Text.Length <= max);

        //     // Фильтр по наличию картинки
        //     if (storyRequest.Pictures == "есть") {
        //         query = query.Where(c => c.Picture != null);
        //     } else if (storyRequest.Pictures == "нет") {
        //         query = query.Where(c => c.Picture == null);
        //     }

        //     // Выборка и сортировка
        //     var stories = query
        //         .Select(c => new StoryDto {
        //             Id = c.Id,
        //             IdUser = c.IdUser,
        //             Author = c.User.Name + " " + c.User.LastName,
        //             Title = c.Title,
        //             Genre = c.Genre,
        //             Annotation = c.Annotation,
        //             Picture = c.Picture,
        //             AddDate = c.AddDate
        //         })
        //         .OrderByDescending(c => c.AddDate)
        //         .ToList();

        //     return stories;
        // }
        // }
        // return stories;
    // }
 

}


  // author = db.Users.FirstOrDefault(c=>c.Name+" "+c.LastName == storyRequest.Author);
            // if(storyRequest.Pictures=="есть"){        
            //     stories = db.Story.Where(c=>c.Picture!=null&&(c.Genre==storyRequest.Genre&&c.Text.Length>=min&&c.Text.Length<=max&&c.IdUser==author.Id).
            //     Select(c => new StoryDto
            //     {
            //         Id = c.Id,
            //         IdUser = c.IdUser,
            //         Author = c.User.Name + " " + c.User.LastName,
            //         Title = c.Title,
            //         Genre = c.Genre,
            //         Annotation = c.Annotation, 
            //         Picture = c.Picture,
            //         AddDate = c.AddDate
            //     }).OrderByDescending(c=>c.AddDate).ToList();
            // }
            // else if(storyRequest.Pictures=="нет"){
            //     stories = db.Story.Where(c=>c.Picture==null&&c.Genre==storyRequest.Genre&&c.Text.Length>=min&&c.Text.Length<=max&&c.IdUser==author.Id).
            //     Select(c => new StoryDto
            //     {
            //         Id = c.Id,
            //         IdUser = c.IdUser,
            //         Author = c.User.Name + " " + c.User.LastName,
            //         Title = c.Title,
            //         Genre = c.Genre,
            //         Annotation = c.Annotation, 
            //         Picture = c.Picture,
            //         AddDate = c.AddDate
            //     }).OrderByDescending(c=>c.AddDate).ToList();
            // }
            // else{
            //     stories = db.Story.Where(c=>c.Genre==storyRequest.Genre&&c.Text.Length>=min&&c.Text.Length<=max&&c.IdUser==author.Id).Select(c => new StoryDto
            //     {
            //         Id = c.Id,
            //         IdUser = c.IdUser,
            //         Author = c.User.Name + " " + c.User.LastName,
            //         Title = c.Title,
            //         Genre = c.Genre,
            //         Annotation = c.Annotation, 
            //         Picture = c.Picture,
            //         AddDate = c.AddDate
            //     }).OrderByDescending(c=>c.AddDate).ToList();
            // }