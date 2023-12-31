﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CompanyController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Company
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Company>>> GetCompany([FromQuery] bool includeArchived = false)
        {
            var query = _context.Company;
            if (query == null)
            {
                return NotFound();
            }
            if (includeArchived)
            {
                var archivedCompanies = await query.ToListAsync();
                return archivedCompanies;
            }
            var nonArchivedRespirators = await query.Where(r => !r.archived).ToListAsync();
            return nonArchivedRespirators;
        }

        // GET: api/Company/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Company>> GetCompany(int id)
        {
            if (_context.Company == null)
            {
                return NotFound();
            }
            var company = await _context.Company
            .Include(c => c.Employees)
            .FirstOrDefaultAsync(c => c.companyID == id);


            if (company == null)
            {
                return NotFound();
            }

            return company;
        }

        // PUT: api/Company/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCompany(int id, Company company)
        {
            if (id != company.companyID)
            {
                return BadRequest();
            }

            _context.Entry(company).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CompanyExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Company
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Company>> PostCompany(Company company)
        {
          if (_context.Company == null)
          {
              return Problem("Entity set 'AppDbContext.Company'  is null.");
          }
            _context.Company.Add(company);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCompany", new { id = company.companyID }, company);
        }

        // DELETE: api/Company/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCompany(int id)
        {
            if (_context.Company == null)
            {
                return NotFound();
            }
            var company = await _context.Company.FindAsync(id);
            if (company == null)
            {
                return NotFound();
            }

            _context.Company.Remove(company);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CompanyExists(int id)
        {
            return (_context.Company?.Any(e => e.companyID == id)).GetValueOrDefault();
        }
    }
}
