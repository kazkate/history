using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[controller]")]
public class LoginController : ControllerBase
{
    [HttpPost]
    public IActionResult Post([FromForm] LoginDto loginRequest){


        User? user;
        using(var db =  new ApplicationContext())
        {
            user = db.Users.FirstOrDefault(c=>c.Login == loginRequest.Login && c.Password == loginRequest.Password);

        }
        if(user == null){
            return BadRequest(new {message = "Неверный логин или пароль"});
        }

        return Ok(user);
    }


}
