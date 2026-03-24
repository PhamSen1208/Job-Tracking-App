using Jobster.Models;
using System.ComponentModel.DataAnnotations;

namespace Jobster.Dtos
{
    public class CreateJobDto
    {
        [Required]
        public string JobTitle {get; set;} = string.Empty;
        [Required]
        public string Company { get; set; } = string.Empty;
        public string? Location { get; set; }
        public string? Salary { get; set; }
        public string? Experience { get; set; }
        public string? Skills {get; set;}   
        public JobStatus Status { get; set; } = JobStatus.Pending;
        public JobPosition Position { get; set; } = JobPosition.Intern;
        public JobType Type { get; set; } = JobType.FullTime;
        public string? ContactName { get; set; }
        public string? ContactEmail { get; set; }
        public string? ContactPhone { get; set; }
        public string? Description { get; set; }
    }
}
