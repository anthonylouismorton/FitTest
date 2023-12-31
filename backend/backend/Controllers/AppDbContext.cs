﻿using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public DbSet<Company> Company { get; set; }

    public DbSet<Employee> Employee { get; set; }

    public DbSet<Respirator>? Respirator { get; set; }

    public DbSet<User> User { get; set; }
    public DbSet<UserRole> UserRole { get; set; }
    public DbSet<QuantitativeRespiratorFitTest>? QuantitativeRespiratorFitTest { get; set; }

    public DbSet<QualitativeRespiratorFitTest>? QualitativeRespiratorFitTest { get; set; }

    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }





}
