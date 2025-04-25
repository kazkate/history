using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
// using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;

using System;

var builder = WebApplication.CreateBuilder(args);
AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

// using(ApplicationContext db = new ApplicationContext()) {

//     var users = db.Users.ToList();
//     foreach (var user in users) {
//         Console.WriteLine(user.Login);
//     }
// }
//  Отключаем HTTPS полностью
// builder.WebHost.ConfigureKestrel(options =>
// {
//     options.ListenAnyIP(8080); // запускаем только HTTP
// });

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddControllers();
builder.Services.AddCors(options => {
    options.AddPolicy("AllowLocalhost3000", builder => {
        builder.WithOrigins("http://localhost:3000").AllowAnyHeader().AllowAnyMethod();
    });
});
// builder.WebHost.ConfigureKestrel(options =>
// {
//     options.ConfigureHttpsDefaults(o => o.SslProtocols = System.Security.Authentication.SslProtocols.None);
// });

var app = builder.Build();
	
app.UseCors("AllowLocalhost3000");
app.UseStaticFiles();

app.UseMiddleware<BasicAuthMiddleware>();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// app.UseHttpsRedirection();
app.MapControllers();

///////-----------

app.Run();