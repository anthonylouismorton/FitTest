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
    public class ValidateUserController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ValidateUserController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/ValidateUser
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUser()
        {
          if (_context.User == null)
          {
              return NotFound();
          }
            return await _context.User.ToListAsync();
        }

        // GET: api/ValidateUser/5
        [HttpGet("{username}")]
        public async Task<ActionResult<User>> GetUser(string username)
        {
            if (_context.User == null)
            {
                return Problem("Entity set 'AppDbContext.User'  is null.");
            }
            var existingUser = await _context.User.FirstOrDefaultAsync(u => u.username == username);


            if (existingUser == null)
            {
                return NoContent();
            }

            return existingUser;

            // Compare the newly hashed password with the stored hashed password
            //bool isPasswordCorrect = existingUser.password == hashedEnteredPassword;
            //if (isPasswordCorrect)
            //{
            //    return existingUser;
            //}
            //else
            //{
            //    return NoContent();
            //}
        }

        // PUT: api/ValidateUser/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.userID)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
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

        // POST: api/ValidateUser
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
          if (_context.User == null)
          {
              return Problem("Entity set 'AppDbContext.User'  is null.");
          }
            var existingUser = await _context.User.FirstOrDefaultAsync(u => u.username == user.username);


            if (existingUser == null)
            {
                return Problem("Invalid User");
            }
            string saltedhash = BCrypt.Net.BCrypt.HashPassword(user.password, existingUser.salt);

            if(saltedhash == existingUser.password)
            {
                return existingUser;
            }
            else
            {
                return Problem("Incorrect Password");
            }

        }

        // DELETE: api/ValidateUser/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            if (_context.User == null)
            {
                return NotFound();
            }
            var user = await _context.User.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.User.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return (_context.User?.Any(e => e.userID == id)).GetValueOrDefault();
        }
    }
}
