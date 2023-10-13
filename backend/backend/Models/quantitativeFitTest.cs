using System;
using System.ComponentModel.DataAnnotations;

public class QuantitativeRespiratorFitTest
{
    [Key]
    public int quantitativeTestID { get; set; }

    public bool testpass { get; set; }

    [Required]
    [DataType(DataType.Date)]
    public System.DateTime testdate { get; set; }

    [Required]
    [DataType(DataType.Time)]
    public System.DateTime testtime { get; set; }

    [Required]
    [DataType(DataType.Date)]
    public System.DateTime testexpiration { get; set; }

    [MaxLength(255)]
    public string? testtype { get; set; }

    [MaxLength(255)]
    public string? size { get; set; }

    [Required]
    [Range(0, 9999999)]
    public int fitfactor1 { get; set; }

    [Range(0, 9999999)]
    public int fitfactor2 { get; set; }

    [Range(0, 9999999)]
    public int fitfactor3 { get; set; }

    [Range(0, 9999999)]
    public int fitfactor4 { get; set; }

    [Range(0, 9999999)]
    public int fitfactor5 { get; set; }

    [Range(0, 9999999)]
    public int fitfactor6 { get; set; }

    [Range(0, 9999999)]
    public int fitfactor7 { get; set; }

    [Range(0, 9999999)]
    public int fitfactor8 { get; set; }

    [Required]
    [Range(0, 9999999)]
    public int overallfitfactor { get; set; }

    [Required]
    public int employeeID { get; set; }

    [Required]
    public int respiratorID { get; set; }

}



