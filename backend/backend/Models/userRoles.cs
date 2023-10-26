using System;
using System.ComponentModel.DataAnnotations;

public class UserRole
{
    [Key]
    public int userroleID { get; set; }

    [Required]
    public string roletype { get; set; }
}

