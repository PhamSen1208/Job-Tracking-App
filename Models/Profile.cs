using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Jobster.Models
{
    public class Profile
    {
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }
        
        [JsonIgnore]
        public User? User { get; set; }

        // Header Info
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Avatar { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string? Link { get; set; } 
        public string? Headline { get; set; }
        public string? Location { get; set; }

        // Career Goal
        public string? CareerGoal { get; set; }

        // Education (Nested object in FE, flat in DB)
        public string? EduMajor { get; set; }
        public string? EduSchool { get; set; }
        public string? EduYears { get; set; }
        public string? EduGPA { get; set; }
        public string? EduCourses { get; set; }

        // Skills (Nested object in FE)
        public string? HardSkills { get; set; } 
        public string? SoftSkills { get; set; } 
        public string? ForeignLanguage { get; set; }
        public string? Certification { get; set; }

        // Relationships
        public List<UserExperience> Experiences { get; set; } = new();
        public List<UserProject> Projects { get; set; } = new();
    }

    public class UserExperience
    {
        public int Id { get; set; }
        public string? Company { get; set; }
        public string? Position { get; set; }
        public string? Duration { get; set; }
        public string? Description { get; set; }

        [Required]
        public int ProfileId { get; set; }
        
        [JsonIgnore]
        public Profile? Profile { get; set; }
    }

    public class UserProject
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? Link { get; set; }

        [Required]
        public int ProfileId { get; set; }
        
        [JsonIgnore]
        public Profile? Profile { get; set; }
    }
}
