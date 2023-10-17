using System;
using System.ComponentModel.DataAnnotations;

public class QualitativeRespiratorFitTest
{
    [Key]
    public int qualitativeTestID { get; set; }

    public bool testpass { get; set; }

    [Required]
    public DateTime testdate { get; set; }

    [Required]
    public DateTime testexpiration { get; set; }

    [MaxLength(255)]
    public string? testtype { get; set; }

    public int tastethreshold { get; set; }

    [MaxLength(255)]
    public string? size { get; set; }

    public bool exercise1 { get; set; }

    public bool exercise2 { get; set; }

    public bool exercise3 { get; set; }

    public bool exercise4 { get; set; }

    [Required]
    public int employeeID { get; set; }

    [Required]
    public int respiratorID { get; set; }

    public Employee? Employee { get; set; }

    public Respirator? Respirator { get; set; }
}



