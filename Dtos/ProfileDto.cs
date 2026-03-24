using Jobster.Models;

namespace Jobster.Dtos 
{
    public class ProfileDto
    {
        //Header info
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
        // Education (Nested object for FE)
        public EducationDto Education { get; set; } = new();
        // Skills (Nested object for FE)
        public SkillsDto Skills { get; set; } = new();
        // Mảng Experience và Project
        public List<ExperienceDto> Experience { get; set; } = new();
        public List<ProjectDto> Projects { get; set; } = new();
    }
    public class EducationDto
    {
        public string? Major { get; set; }
        public string? School { get; set; }
        public string? Years { get; set; }
        public string? Gpa { get; set; }
        public string? Courses { get; set; }
    }
    public class SkillsDto
    {
        public string? HardSkills { get; set; }
        public string? SoftSkills { get; set; }
        public string? ForeignLanguage { get; set; }
        public string? Certification { get; set; }
    }
    public class ExperienceDto
    {
        public string? Company { get; set; }
        public string? Position { get; set; }
        public string? Duration { get; set; }
        public string? Description { get; set; }
    }
    public class ProjectDto
    {
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? Link { get; set; }
    }
}