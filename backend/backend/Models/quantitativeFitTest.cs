using System;
using System.ComponentModel.DataAnnotations;

public class QuantitativeFitTest
{
    [Key]
    public int quantitativeTestID { get; set; }

    public Boolean testpass { get; set; }

    [Required]
    [DataType(DataType.Date)]
    public System.DateTime testdate { get; set; }

    [Required]
    [DataType(DataType.Time)]
    public System.DateTime testtime { get; set; }

    [Required]
    [DataType(DataType.Date)]
    public System.DateTime testexpiration { get; set; }

    [Required]
    [MaxLength(7)]
    public string fitfactor1 { get; set; }

    [Required]
    [MaxLength(7)]
    public string fitfactor2 { get; set; }

    [Required]
    [MaxLength(7)]
    public string fitfactor3 { get; set; }

    [Required]
    [MaxLength(7)]
    public string fitfactor4 { get; set; }

    [Required]
    [MaxLength(7)]
    public string fitfactor5 { get; set; }

    [Required]
    [MaxLength(7)]
    public string fitfactor6 { get; set; }

    [Required]
    [MaxLength(7)]
    public string fitfactor7 { get; set; }

    [Required]
    [MaxLength(7)]
    public string fitfactor8 { get; set; }

    [Required]
    [MaxLength(7)]
    public string overallfitfactor { get; set; }

    [Required]
    public int employeeID { get; set; }

    [Required]
    public int respiratorID { get; set; }

}



