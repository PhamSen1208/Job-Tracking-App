using Jobster.Data;
using Jobster.Models;
using Jobster.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Jobster.Services.Implementations
{
    public class JobService : IJobService
    {
        private readonly AppDbContext _context;
        public JobService(AppDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Job>> GetJobsByUserIdAsync(int userId)
        {
            return await _context.Jobs
                .Where(job => job.UserId == userId)
                .OrderByDescending(job => job.AppliedDate)
                .ToListAsync();
        }
        public async Task<Job?> GetJobByIdAsync(int id, int userId)
        {
           return await _context.Jobs
                .Where(job => job.UserId == userId && job.Id == id)
                .FirstOrDefaultAsync();
        }
        public async Task<Job> CreateJobAsync(Job job)
        {
            _context.Jobs.Add(job);
            await _context.SaveChangesAsync();
            return job;
        }
        public async Task<bool> UpdateJobAsync(Job jobRequest)
        {
            var existingJob = await _context.Jobs.Where(job => job.Id == jobRequest.Id && job.UserId == jobRequest.UserId).FirstOrDefaultAsync();
            if (existingJob == null)
            {
                return false;
            }
            existingJob.JobTitle = jobRequest.JobTitle;
            existingJob.Company = jobRequest.Company;
            existingJob.Location = jobRequest.Location;
            existingJob.Status = jobRequest.Status;
            existingJob.AppliedDate = jobRequest.AppliedDate;
            existingJob.Description = jobRequest.Description;
            existingJob.Salary = jobRequest.Salary;
            existingJob.Experience = jobRequest.Experience;
            existingJob.Skills = jobRequest.Skills;
            existingJob.Position = jobRequest.Position;
            existingJob.Type = jobRequest.Type;
            existingJob.ContactName = jobRequest.ContactName;
            existingJob.ContactEmail = jobRequest.ContactEmail;
            existingJob.ContactPhone = jobRequest.ContactPhone;
            await _context.SaveChangesAsync();
            return true;
        }
        public async Task<bool> DeleteJobAsync(int id, int userId)
        {
            var job = await _context.Jobs.FirstOrDefaultAsync(job => job.Id == id && job.UserId == userId);
            if (job == null)
            {
                return false;
            }
            _context.Jobs.Remove(job);
            await _context.SaveChangesAsync();
            return true;
        }

    }
}