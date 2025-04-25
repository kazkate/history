using System.ComponentModel.DataAnnotations.Schema;

public class Story { 
    public int Id {get;set;}

    public int? IdUser {get;set;}
    [ForeignKey("IdUser")]
    public User? User {get;set;} 
    public string? Title {get; set;}
    public string? Genre {get; set;}    
    public string? Annotation {get; set;} 
    public string? Text {get;set;}
    public string? Picture {get;set;}
    
    public DateTime? AddDate {get; set;} 
}