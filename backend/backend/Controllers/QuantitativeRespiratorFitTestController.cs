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
    public class QuantitativeRespiratorFitTestController : ControllerBase
    {
        private readonly AppDbContext _context;

        public QuantitativeRespiratorFitTestController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/QuantitativeRespiratorFitTest
        [HttpGet]
        public async Task<ActionResult<IEnumerable<QuantitativeFitTest>>> GetQuantitativeFitTest()
        {
          if (_context.QuantitativeFitTest == null)
          {
              return NotFound();
          }
            return await _context.QuantitativeFitTest.ToListAsync();
        }

        // GET: api/QuantitativeRespiratorFitTest/5
        [HttpGet("{id}")]
        public async Task<ActionResult<QuantitativeFitTest>> GetQuantitativeFitTest(int id)
        {
          if (_context.QuantitativeFitTest == null)
          {
              return NotFound();
          }
            var quantitativeFitTest = await _context.QuantitativeFitTest.FindAsync(id);

            if (quantitativeFitTest == null)
            {
                return NotFound();
            }

            return quantitativeFitTest;
        }

        // PUT: api/QuantitativeRespiratorFitTest/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutQuantitativeFitTest(int id, QuantitativeFitTest quantitativeFitTest)
        {
            if (id != quantitativeFitTest.quantitativeTestID)
            {
                return BadRequest();
            }

            _context.Entry(quantitativeFitTest).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QuantitativeFitTestExists(id))
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

        // POST: api/QuantitativeRespiratorFitTest
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<QuantitativeFitTest>> PostQuantitativeFitTest(QuantitativeFitTest quantitativeFitTest)
        {
          if (_context.QuantitativeFitTest == null)
          {
              return Problem("Entity set 'AppDbContext.QuantitativeFitTest'  is null.");
          }
            _context.QuantitativeFitTest.Add(quantitativeFitTest);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetQuantitativeFitTest", new { id = quantitativeFitTest.quantitativeTestID }, quantitativeFitTest);
        }

        // DELETE: api/QuantitativeRespiratorFitTest/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuantitativeFitTest(int id)
        {
            if (_context.QuantitativeFitTest == null)
            {
                return NotFound();
            }
            var quantitativeFitTest = await _context.QuantitativeFitTest.FindAsync(id);
            if (quantitativeFitTest == null)
            {
                return NotFound();
            }

            _context.QuantitativeFitTest.Remove(quantitativeFitTest);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool QuantitativeFitTestExists(int id)
        {
            return (_context.QuantitativeFitTest?.Any(e => e.quantitativeTestID == id)).GetValueOrDefault();
        }
    }
}
