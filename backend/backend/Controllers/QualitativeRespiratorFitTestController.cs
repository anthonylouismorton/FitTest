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
    public class QualitativeRespiratorFitTestController : ControllerBase
    {
        private readonly AppDbContext _context;

        public QualitativeRespiratorFitTestController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/QualitativeRespiratorFitTest
        [HttpGet]
        public async Task<ActionResult<IEnumerable<QualitativeRespiratorFitTest>>> GetQualitativeRespiratorFitTest()
        {
          if (_context.QualitativeRespiratorFitTest == null)
          {
              return NotFound();
          }
            return await _context.QualitativeRespiratorFitTest.ToListAsync();
        }

        // GET: api/QualitativeRespiratorFitTest/5
        [HttpGet("{id}")]
        public async Task<ActionResult<QualitativeRespiratorFitTest>> GetQualitativeRespiratorFitTest(int id)
        {
          if (_context.QualitativeRespiratorFitTest == null)
          {
              return NotFound();
          }
            var qualitativeRespiratorFitTest = await _context.QualitativeRespiratorFitTest.FindAsync(id);

            if (qualitativeRespiratorFitTest == null)
            {
                return NotFound();
            }

            return qualitativeRespiratorFitTest;
        }

        // PUT: api/QualitativeRespiratorFitTest/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutQualitativeRespiratorFitTest(int id, QualitativeRespiratorFitTest qualitativeRespiratorFitTest)
        {
            if (id != qualitativeRespiratorFitTest.qualitativeTestID)
            {
                return BadRequest();
            }

            _context.Entry(qualitativeRespiratorFitTest).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QualitativeRespiratorFitTestExists(id))
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

        // POST: api/QualitativeRespiratorFitTest
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<QualitativeRespiratorFitTest>> PostQualitativeRespiratorFitTest(QualitativeRespiratorFitTest qualitativeRespiratorFitTest)
        {
          if (_context.QualitativeRespiratorFitTest == null)
          {
              return Problem("Entity set 'AppDbContext.QualitativeRespiratorFitTest'  is null.");
          }
            _context.QualitativeRespiratorFitTest.Add(qualitativeRespiratorFitTest);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetQualitativeRespiratorFitTest", new { id = qualitativeRespiratorFitTest.qualitativeTestID }, qualitativeRespiratorFitTest);
        }

        // DELETE: api/QualitativeRespiratorFitTest/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQualitativeRespiratorFitTest(int id)
        {
            if (_context.QualitativeRespiratorFitTest == null)
            {
                return NotFound();
            }
            var qualitativeRespiratorFitTest = await _context.QualitativeRespiratorFitTest.FindAsync(id);
            if (qualitativeRespiratorFitTest == null)
            {
                return NotFound();
            }

            _context.QualitativeRespiratorFitTest.Remove(qualitativeRespiratorFitTest);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool QualitativeRespiratorFitTestExists(int id)
        {
            return (_context.QualitativeRespiratorFitTest?.Any(e => e.qualitativeTestID == id)).GetValueOrDefault();
        }
    }
}
