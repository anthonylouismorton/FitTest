using System;
using System.ComponentModel.DataAnnotations;

public class Company
{   
    [Key]
    public int companyID { get; set; }

    [Required]
    [MaxLength(255)]
    public string companyAddress1 { get; set; }
    
    [MaxLength(255)]
    public string? companyAddress2 { get; set; }

    [MaxLength(255)]
    public string? companyAddress3 { get; set; }

    [Required]
    [MaxLength(255)]
    public string companyCity{ get; set; }

    [MaxLength(2)]
    public string? companystate { get; set; }

    [MaxLength(10)]
    public string? companyZipCode { get; set; }

    [Required]
    [MaxLength(255)]
    public string companyEmail { get; set; }

    [MaxLength(255)]
    public string? companyAltEmail { get; set; }

    [MaxLength(20)]
    public string? companyPhoneNumber { get; set; }

    [MaxLength(10)]
    public string? companyPhoneNumberExt { get; set; }
}
