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
        public async Task<ActionResult<IEnumerable<QuantitativeRespiratorFitTest>>> GetQuantitativeRespiratorFitTest()
        {
          if (_context.QuantitativeRespiratorFitTest == null)
          {
              return NotFound();
          }
            return await _context.QuantitativeRespiratorFitTest.ToListAsync();
        }

        // GET: api/QuantitativeRespiratorFitTest/5
        [HttpGet("{id}")]
        public async Task<ActionResult<QuantitativeRespiratorFitTest>> GetQuantitativeRespiratorFitTest(int id)
        {
          if (_context.QuantitativeRespiratorFitTest == null)
          {
              return NotFound();
          }
            var quantitativeRespiratorFitTest = await _context.QuantitativeRespiratorFitTest.FindAsync(id);

            if (quantitativeRespiratorFitTest == null)
            {
                return NotFound();
            }

            return quantitativeRespiratorFitTest;
        }

        // PUT: api/QuantitativeRespiratorFitTest/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutQuantitativeRespiratorFitTest(int id, QuantitativeRespiratorFitTest quantitativeRespiratorFitTest)
        {
            if (id != quantitativeRespiratorFitTest.quantitativeTestID)
            {
                return BadRequest();
            }

            _context.Entry(quantitativeRespiratorFitTest).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QuantitativeRespiratorFitTestExists(id))
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
        public async Task<ActionResult<QuantitativeRespiratorFitTest>> PostQuantitativeRespiratorFitTest(QuantitativeRespiratorFitTest quantitativeRespiratorFitTest)
        {
          if (_context.QuantitativeRespiratorFitTest == null)
          {
              return Problem("Entity set 'AppDbContext.QuantitativeRespiratorFitTest'  is null.");
          }
            _context.QuantitativeRespiratorFitTest.Add(quantitativeRespiratorFitTest);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetQuantitativeRespiratorFitTest", new { id = quantitativeRespiratorFitTest.quantitativeTestID }, quantitativeRespiratorFitTest);
        }

        // DELETE: api/QuantitativeRespiratorFitTest/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuantitativeRespiratorFitTest(int id)
        {
            if (_context.QuantitativeRespiratorFitTest == null)
            {
                return NotFound();
            }
            var quantitativeRespiratorFitTest = await _context.QuantitativeRespiratorFitTest.FindAsync(id);
            if (quantitativeRespiratorFitTest == null)
            {
                return NotFound();
            }

            _context.QuantitativeRespiratorFitTest.Remove(quantitativeRespiratorFitTest);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool QuantitativeRespiratorFitTestExists(int id)
        {
            return (_context.QuantitativeRespiratorFitTest?.Any(e => e.quantitativeTestID == id)).GetValueOrDefault();
        }
    }
}
