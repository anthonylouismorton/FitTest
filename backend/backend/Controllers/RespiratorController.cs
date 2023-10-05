using System;
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
    public class RespiratorController : ControllerBase
    {
        private readonly AppDbContext _context;

        public RespiratorController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Respirator
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Respirator>>> GetRespirator()
        {
          if (_context.Respirator == null)
          {
              return NotFound();
          }
            return await _context.Respirator.ToListAsync();
        }

        // GET: api/Respirator/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Respirator>> GetRespirator(int id)
        {
          if (_context.Respirator == null)
          {
              return NotFound();
          }
            var respirator = await _context.Respirator.FindAsync(id);

            if (respirator == null)
            {
                return NotFound();
            }

            return respirator;
        }

        // PUT: api/Respirator/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRespirator(int id, Respirator respirator)
        {
            if (id != respirator.respiratorID)
            {
                return BadRequest();
            }

            _context.Entry(respirator).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RespiratorExists(id))
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

        // POST: api/Respirator
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Respirator>> PostRespirator(Respirator respirator)
        {
          if (_context.Respirator == null)
          {
              return Problem("Entity set 'AppDbContext.Respirator'  is null.");
          }
            _context.Respirator.Add(respirator);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRespirator", new { id = respirator.respiratorID }, respirator);
        }

        // DELETE: api/Respirator/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRespirator(int id)
        {
            if (_context.Respirator == null)
            {
                return NotFound();
            }
            var respirator = await _context.Respirator.FindAsync(id);
            if (respirator == null)
            {
                return NotFound();
            }

            _context.Respirator.Remove(respirator);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RespiratorExists(int id)
        {
            return (_context.Respirator?.Any(e => e.respiratorID == id)).GetValueOrDefault();
        }
    }
}
