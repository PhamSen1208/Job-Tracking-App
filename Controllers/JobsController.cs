using Microsoft.AspNetCore.Mvc;
using Jobster.Models;
using Jobster.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

//Tày a man vô sửa code tí hehehe
namespace Jobster.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class JobsController : ControllerBase
    {
        private readonly IJobService _jobService;
        public JobsController(IJobService jobService)
        {
            _jobService = jobService;
        }
        //Lấy danh sách jobs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Job>>> Getjobs()
        {
            var userId = GetUserId();
            var jobs = await _jobService.GetJobsByUserIdAsync(userId);
            return Ok(jobs);
        }
        //Lấy job theo id
        [HttpGet("{id}")]
        public async Task<ActionResult<Job>> GetJobById(int id)
        {
            var userId = GetUserId();
            var job = await _jobService.GetJobByIdAsync(id, userId);
            if (job == null)
            {
                return NotFound();
            }
            return Ok(job);
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