using Microsoft.AspNetCore.Mvc;
using Jobster.Data;
using Jobster.Models;
using Jobster.Dtos;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;


namespace Jobster.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class JobsController : ControllerBase
    {
        private readonly AppDbContext _context;
        public JobsController(AppDbContext context)
        {
            _context = context;
        }

        //Lấy danh sách jobs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Job>>> Getjobs() 
        {
            var userId = GetUserId();
            return await _context.Jobs
            .Where(j => j.UserId == userId)
            .ToListAsync();
        }

        //Thêm job mới
        [HttpPost]
        public async Task<ActionResult<Job>> PostJob([FromBody]CreateJobDto jobDto)
        {
            var job = new Job
            {
                JobTitle = jobDto.JobTitle,
                Company = jobDto.Company,
                Location = jobDto.Location,
                Salary = jobDto.Salary,
                Experience = jobDto.Experience,
                Skills = jobDto.Skills,
                Status = jobDto.Status,
                Position = jobDto.Position,
                Type = jobDto.Type,
                ContactName = jobDto.Contact.Name,
                ContactEmail = jobDto.Contact.Email,
                ContactPhone = jobDto.Contact.Phone,
                Description = jobDto.Description,
        
                // Luôn luôn lấy UserId từ Token để đảm bảo an toàn
                UserId = GetUserId(),
                AppliedDate = DateTime.Now
            };
            
            _context.Jobs.Add(job);
            await _context.SaveChangesAsync(); 

            return CreatedAtAction(nameof(Getjobs), new {id = job.Id}, job);
        }

        //Xem chi tiết 1 job
        [HttpGet("{id}")]
        public async Task<ActionResult<Job>> Getjob (int id)
        {
            var userId = GetUserId();
            var job = await _context.Jobs.FirstOrDefaultAsync(j => j.Id == id && j.UserId == userId);
            
            if(job == null)
            {
                return NotFound("Không tìm thấy công việc này hoặc bạn không có quyền truy cập");
            }
            return job;
        }

        //Cập nhật job
        [HttpPut("{id}")]
        public async Task<ActionResult<Job>> Putjob(int id, [FromBody]CreateJobDto jobDto)
        {
            var userId = GetUserId();
            // Kiểm tra xem job có tồn tại và có thuộc về user này không
            var existingJob = await _context.Jobs.AsNoTracking().FirstOrDefaultAsync(j => j.Id == id && j.UserId == userId);
            
            if (existingJob == null)
            {
                return NotFound("Không tìm thấy công việc này hoặc bạn không có quyền sửa");
            }

            var job = new Job
            {
                Id = id,
                JobTitle = jobDto.JobTitle,
                Company = jobDto.Company,
                Location = jobDto.Location,
                Salary = jobDto.Salary,
                Experience = jobDto.Experience,
                Skills = jobDto.Skills,
                Status = jobDto.Status,
                Position = jobDto.Position,
                Type = jobDto.Type,
                ContactName = jobDto.Contact.Name,
                ContactEmail = jobDto.Contact.Email,
                ContactPhone = jobDto.Contact.Phone,
                Description = jobDto.Description,
                
                UserId = GetUserId(),
                AppliedDate = existingJob.AppliedDate
            };

            _context.Entry(job).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch(DbUpdateConcurrencyException)
            {
                if(!_context.Jobs.Any(e => e.Id == id))
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

        //Xóa công việc
        [HttpDelete("{id}")]
        public async Task<ActionResult<Job>> Deletejob(int id)
        {
            var userId = GetUserId();
            var job = await _context.Jobs.FirstOrDefaultAsync(j => j.Id == id && j.UserId == userId);
            
            if(job == null)
            {
                return NotFound("Không tìm thấy công việc này hoặc bạn không có quyền xóa");
            }

            _context.Jobs.Remove(job);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        private int GetUserId()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
            {
                throw new UnauthorizedAccessException("Không tìm thấy ID người dùng trong token");
            }
            return int.Parse(userIdClaim.Value);
        }
    }
}