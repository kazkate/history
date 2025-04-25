using Microsoft.AspNetCore.SignalR;

public class RegisterDto {
    public int Id {get;set;}
    public string Name {get; set;} = null!;
    public string LastName {get; set;} = null!;    
    public string Email {get; set;} = null!;
    public string Login {get; set;} = null!;
    public string Password {get; set;} = null!;
    public string? Role {get;set;} = null!;
    public DateTime? RegisterDate {get; set;} 
}