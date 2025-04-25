using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[controller]")]
public class RegisterController : ControllerBase {
    [HttpPost]
    public IActionResult Post([FromForm] RegisterDto registerRequest) {
        User? user;
        using(var db = new ApplicationContext())
        {
            user = db.Users.FirstOrDefault(c => c.Login == registerRequest.Login);
            if (user != null)
            {
            return BadRequest(new {message = "Данный псевдоним уже занят"});
            }

        var newUser = new User {
            Login = registerRequest.Login,
            Password = registerRequest.Password,
            Role = registerRequest.Role,
            LastName=registerRequest.LastName,
            Name=registerRequest.Name,
            Email=registerRequest.Email,
            RegisterDate = DateTime.Now
        };
        Console.Write(newUser.Login + " " + newUser.Password);
        db.Users.Add(newUser);
        db.SaveChanges();
        return Ok(user);
        }
    }
}