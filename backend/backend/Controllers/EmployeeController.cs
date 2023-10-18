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
    public class EmployeeController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EmployeeController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Employee
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployee()
        {
          if (_context.Employee == null)
          {
              return NotFound();
          }
        var employees = await _context.Employee
            .Include(q => q.Company)
            .ToListAsync();

        return employees;
        }

        // GET: api/Employee/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployee(int id)
        {
          if (_context.Employee == null)
          {
              return NotFound();
          }
            var employee = await _context.Employee
                       .Include(c => c.QualitativeRespiratorFitTests)
                       .Include(q => q.QuantitativeRespiratorFitTests)
                       .FirstOrDefaultAsync(c => c.employeeID == id);


            if (employee == null)
            {
                return NotFound();
            }

            return employee;
        }

        // PUT: api/Employee/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployee(int id, Employee employee)
        {
            if (id != employee.employeeID)
            {
                return BadRequest();
            }

            var existingEmployee = await _context.Employee.FindAsync(id);
            if (existingEmployee == null)
            {
                return NotFound();
            }

            // Update specific properties
            existingEmployee.firstname = employee.firstname;
            existingEmployee.middlename = employee.middlename;
            existingEmployee.lastname = employee.lastname;
            existingEmployee.address1 = employee.address1;
            existingEmployee.address2 = employee.address2;
            existingEmployee.address3 = employee.address3;
            existingEmployee.city = employee.city;
            existingEmployee.state = employee.state;
            existingEmployee.zipcode = employee.zipcode;
            existingEmployee.birthday = employee.birthday;
            existingEmployee.companyID = employee.companyID;
            existingEmployee.email = employee.email;
            existingEmployee.phonenumber = employee.phonenumber;
            existingEmployee.ssn = employee.ssn;
            // Continue updating other properties as needed

            // Save changes to the database
            await _context.SaveChangesAsync();

            return NoContent();
        }


        // POST: api/Employee
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Employee>> PostEmployee(Employee employee)
        {
          if (_context.Employee == null)
          {
              return Problem("Entity set 'AppDbContext.Employee'  is null.");
          }
            _context.Employee.Add(employee);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEmployee", new { id = employee.employeeID }, employee);
        }

        // DELETE: api/Employee/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            if (_context.Employee == null)
            {
                return NotFound();
            }
            var employee = await _context.Employee.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }

            _context.Employee.Remove(employee);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EmployeeExists(int id)
        {
            return (_context.Employee?.Any(e => e.employeeID == id)).GetValueOrDefault();
        }
    }
}
