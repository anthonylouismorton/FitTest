using System;
using System.ComponentModel.DataAnnotations;

public class Respirator
{
    [Key]
    public int respiratorID { get; set; }

    [Required]
    [MaxLength(255)]
    public string? make { get; set; }

    [MaxLength(255)]
    public string? model { get; set; }

    [Required]
    [MaxLength(255)]
    public string? style { get; set; }

    [Required]
    [MaxLength(255)]
    public string? fitfactor { get; set; }

}
