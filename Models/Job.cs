using System.ComponentModel.DataAnnotations;

namespace Jobster.Models
{
    public enum JobStatus
    {
        Pending,
        Interviewing,
        Rejected
    }

    public enum JobPosition
    {
        Intern,
        Fresher,
        Junior,
        Middle,
        Senior
    }

    public enum JobType
    {
        FullTime,
        PartTime,
        Remote
    }

    public class Job
    {
        public int Id { get; set; }

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

        public DateTime AppliedDate { get; set; } = DateTime.Now;

        public string? ContactName { get; set; }

        public string? ContactEmail { get; set; }

        public string? ContactPhone { get; set; }

        public string? Description { get; set; }


        // Khóa ngoại liên kết tới User
        [Required]
        public int UserId { get; set; }
        
        // Navigation property: Dùng để lấy thông tin User từ Job một cách dễ dàng
        public User? User { get; set; }

        // Navigation property: Dùng để lấy thông tin JobHistory từ Job một cách dễ dàng
        public ICollection<JobHistory> Histories {get; set;} = new List<JobHistory>();

    }
}
