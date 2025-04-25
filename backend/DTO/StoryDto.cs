public class StoryDto { 
    public int Id {get;set;}
    public int? IdUser {get;set;}= null! ;    
    public string? Author {get;set;} = null! ;
    public string? Title {get; set;}= null! ;
    public string? Genre {get; set;}  = null! ;  
    public string? Annotation {get; set;} = null! ;
    public string? Text {get;set;}= null! ;
    public string? Picture {get;set;}= null! ;
    public IFormFile? File {get; set;}= null! ;
    public DateTime? AddDate {get; set;} = null! ;
}