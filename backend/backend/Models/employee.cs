using System;
using System.ComponentModel.DataAnnotations;

public class Employee
{
    [Key]
    public int employeeID { get; set; }

    [Required]
    [MaxLength(255)]
    public string? firstname { get; set; }

    [MaxLength(255)]
    public string? middlename { get; set; }

    [Required]
    [MaxLength(255)]
    public string? lastname { get; set; }

    [Required]
    [DataType(DataType.Date)]
    public System.DateTime birthday { get; set; }

    [Required]
    [MaxLength(255)]
    public string? ssn { get; set; }

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

    [Required]
    [MaxLength(255)]
    public string? email { get; set; }

    [MaxLength(20)]
    public string? phonenumber { get; set; }

    [Required]
    public int companyID { get; set; }

    public Company Company { get; set; }
}
