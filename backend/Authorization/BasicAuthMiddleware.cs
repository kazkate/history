using System;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;

public class BasicAuthMiddleware
{
    private readonly RequestDelegate _next;

    public BasicAuthMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task Invoke(HttpContext context)
    {

        if (context.Request.Headers.ContainsKey("Authorization"))
        {
            var authHeader = AuthenticationHeaderValue.Parse(context.Request.Headers["Authorization"]);
            if (authHeader.Parameter != null)
            {
                var credentialBytes = Convert.FromBase64String(authHeader.Parameter);
                string credentialsStr = Encoding.UTF8.GetString(credentialBytes);
                string credential = System.Web.HttpUtility.UrlDecode(credentialsStr);
                string[] credentialArray = credential.Split(":", 2);


                string username = credentialArray[0];
                string password = credentialArray[1];
                // аутентифицируем пользователя и добавляем его в http context
                User? user;
                using (ApplicationContext db = new ApplicationContext())
                {
                    user = db.Users.FirstOrDefault(c => c.Login == username && c.Password == password);

                }
                context.Items["UserId"] = user?.Id;
            }
        }
        await _next(context);
    }
}