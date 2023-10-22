using System;
using System.ComponentModel.DataAnnotations;

public class Users
{   
    [Key]
    public int userID { get; set; }

    public string username { get; set; }
    public string firstname { get; set; }
    public string lastname { get; set; }
    public string email { get; set; }
    public string password { get; set; }
    public string accountstatus { get; set; }
    public string registrationdate { get; set; }
    public string logindates { get; set; }
    public string apitokens { get; set; }
    //public ICollection<UserRole> UserRoles { get; set; }
    public string permissions { get; set; }
}
