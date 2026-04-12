using Jobster.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Jobster.Services.Interfaces
{
    public interface IJobService
    {
        Task<IEnumerable<Job>> GetJobsByUserIdAsync(int userId);
        Task<Job?> GetJobByIdAsync(int id, int userId);
        Task<Job> CreateJobAsync(Job job);
        Task<bool> UpdateJobAsync(Job job);
        Task<bool> DeleteJobAsync(int id, int userId);
    }
}