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

        public HrContactDto Contact {get; set;} = new();
        public string? Description { get; set; }

        public class HrContactDto 
        { 
            public string? Name {get; set;}
            public string? Email {get; set;}
            public string? Phone {get; set;}
        }
    }
}
