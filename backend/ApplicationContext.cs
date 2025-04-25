using System.ComponentModel.DataAnnotations.Schema;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;

public class ApplicationContext : DbContext {
    public DbSet<User> Users {get; set;} = null!;
    
    public DbSet<Story> Story {get; set;} = null!;

    public ApplicationContext(){
        var databaseCreated = Database.EnsureCreated();
        if (databaseCreated)
        {
            User user1 = new User {Login = "agatakristy", Password = "111111", Name="Агата", LastName="Кристи", RegisterDate = DateTime.Now};
            User user2 = new User {Login = "fedorDos", Password = "111111",  Name="Фёдор", LastName="Достоевский", RegisterDate = DateTime.Now};
            User user3 = new User {Login = "reyrey", Password = "111111", Name="Рэй", LastName="Брэдбери", RegisterDate = DateTime.Now};
            User user4 = new User {Login = "admin", Password = "slovoadmin", Name="Агата", LastName="Кристи", RegisterDate = DateTime.Now};

            Users.Add(user1);
            Users.Add(user2);
            Users.Add(user3);
            Users.Add(user4);

            SaveChanges();

            Story story1 = new Story {IdUser = 1, Title= "Девушка в поезде",  Genre="Детектив", Annotation="Загадочное убийство происходит в поезде, и Пуаро, находящийся рядом, быстро раскрывает странные обстоятельства преступления.", Text="", Picture="static/images/book.jpg", AddDate= new DateTime(2024, 12,12) };
            Story story2 = new Story {IdUser = 2, Title= "Записки из подполья",  Genre="Комедия", Annotation="\"Записки из подполья\" — это одно из наиболее известных произведений Фёдора Достоевского, однако, несмотря на глубину философских вопросов, затронутых в книге, оно содержит немало элементов черного юмора и сатиры, что делает его комедийным с оттенком трагедии.", Text="", Picture="static/images/comedy.jpg", AddDate= DateTime.Now };
            Story story3 = new Story {IdUser = 3, Title= "Культиватор",  Genre="Детектив", Annotation="Рассказ о технологиях создания растений, способных менять форму, и влиянии этих новшеств на человека.", Text="", Picture="static/images/rey.jpg", AddDate= DateTime.Now };
            Story story4 = new Story {IdUser = 4, Title= "Путешествие на край ночи",  Genre="Приключения", Annotation=" «Путешествие на край ночи» — это знаменитая работа Льюиса Стернса, английского писателя XVIII века. Она наполнено элементами приключенческого жанра с доброй долей комедийных моментов.", Text="", Picture="static/images/night.jpg", AddDate= DateTime.Now };
            
            Story.Add(story1);
            Story.Add(story2);
            Story.Add(story3);
            Story.Add(story4);
            
            SaveChanges();
        }
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        var dbHost = Environment.GetEnvironmentVariable("DB_HOST") ?? "localhost";
        var dbPort = Environment.GetEnvironmentVariable("DB_PORT") ?? "5432";
        var dbUsername = Environment.GetEnvironmentVariable("DB_USERNAME") ?? "postgres";
        var dbPassword = Environment.GetEnvironmentVariable("DB_PASSWORD") ?? "1234";
        var dbName = Environment.GetEnvironmentVariable("DB_NAME") ?? "stories";

        // optionsBuilder.UseNpgsql($"Host={dbHost};Port={dbPort};Database={dbName};Username={dbUsername};Password={dbPassword}");
        optionsBuilder.UseNpgsql("Host=postgres; Port=5432;Database=stories;Username=postgres;Password=1234");
    }
}