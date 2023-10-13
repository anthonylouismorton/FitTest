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
    [Range(0, 9999999)]
    public int fitfactor { get; set; }

    public bool archived { get; set; } 

}
