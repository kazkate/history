using System.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("[controller]")]
public class AddStoryController : ControllerBase
{
    [HttpPost]
    public IActionResult Post([FromForm] StoryDto storyRequest){

        Story? story;
        User? author;
        using(var db =  new ApplicationContext())
        {
            author = db.Users.FirstOrDefault(c=>c.Login == storyRequest.Author);
            story = db.Story.FirstOrDefault(c => c.Title == storyRequest.Title&&c.IdUser==author.Id);
            if (story != null)
            {
                return BadRequest(new {message = "Вы уже создали историю с таким названием"});
            }
            // string Name="base";
            // var ext = ".jpg";
            string fileName = "default.jpg";
            string ext = ".jpg";
            if(storyRequest.File!=null){
                // string path = Path.GetFullPath(Path.Combine(Environment.CurrentDirectory, "wwwroot/img"));

                // ext = Path.GetExtension(storyRequest.File.FileName);
                // Console.WriteLine("ext = " + ext);
                // using (var fileStream = new FileStream(Path.Combine(path, storyRequest.File.FileName), FileMode.Create))
                // {
                //     storyRequest.File.CopyTo(fileStream);
                // }
                // string oldPath = path + "\\"+storyRequest.File.FileName;
                // Console.Write(oldPath);
                
                // if(storyRequest.Picture==null){
                //     Name=storyRequest.File.FileName+storyRequest.Title;
                // }else{
                //     Name=storyRequest.Picture;
                // }
                // string newPath = "X:/8semester/Программирование сетевых приложений/history/frontend/public/images/"+ Name + ext;
                // Console.Write(newPath);
                // if (System.IO.File.Exists(oldPath)) 
                // {
                //     System.IO.File.Move(oldPath, newPath);
                //     Console.Write("да");
                // }
                ext = Path.GetExtension(storyRequest.File.FileName);
                fileName = (storyRequest.Picture ?? Path.GetFileNameWithoutExtension(storyRequest.File.FileName) + "_" + Guid.NewGuid().ToString()) + ext;

                var savePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "img", fileName);
                using (var stream = new FileStream(savePath, FileMode.Create))
                {
                    storyRequest.File.CopyTo(stream);
                }
            }
            

            var newStory = new Story {
                IdUser = author.Id,
                Title = storyRequest.Title,
                Genre = storyRequest.Genre,
                Annotation = storyRequest.Annotation,
                Text = storyRequest.Text,
                Picture = fileName,               
                AddDate = DateTime.Now                
            }; 

            db.Story.Add(newStory);
            db.SaveChanges();
            
            return Ok(newStory);
        }  
    }
}