using System;
using System.ComponentModel.DataAnnotations;

public class Company
{   
    [Key]
    public int companyID { get; set; }

    [MaxLength(255)]
    public string? name { get; set; }

    [Required]
    [MaxLength(255)]
    public string? address1 { get; set; }
    
    [MaxLength(255)]
    public string? address2 { get; set; }

    [MaxLength(255)]
    public string? address3 { get; set; }

    [MaxLength(255)]
    public string? city { get; set; }

    [MaxLength(2)]
    public string? state { get; set; }

    [MaxLength(10)]
    public string? zipcode { get; set; }

    [MaxLength(255)]
    public string? email { get; set; }

    [MaxLength(255)]
    public string? altemail { get; set; }

    [MaxLength(20)]
    public string? phonenumber { get; set; }

    [MaxLength(10)]
    public string? phonenumberext { get; set; }
}
