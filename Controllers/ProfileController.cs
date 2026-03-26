using Microsoft.AspNetCore.Mvc;
using Jobster.Data;
using Jobster.Models;
using Jobster.Dtos;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace Jobster.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]

    public class ProfileController : ControllerBase
    {
        private readonly AppDbContext _context;
        public ProfileController(AppDbContext context)
        {
            _context = context;
        }

        //GET api/profile
        [HttpGet]
        public async Task<ActionResult<ProfileDto>> getProfile()
        {
            var userId = GetUserId();
            //Tìm profile của user và load kèm các thông tin liên quan (Experiences và Projects)
            var profile = await _context.Profiles
            .Include(p => p.Experiences)
            .Include(p => p.Projects)
            .FirstOrDefaultAsync(p => p.UserId == userId);

            if(profile == null)
            {
                return NotFound("Profile chưa được khởi tạo");
            }
            //Map từ Model sang DTO để trả về cho FE
            var profileDto = new ProfileDto
            {
                FirstName = profile.FirstName,
                LastName = profile.LastName,
                Avatar = profile.Avatar,
                Phone = profile.Phone,
                Link = profile.Link,
                Email = profile.Email,
                Location = profile.Location,
                Headline = profile.Headline,
                CareerGoal = profile.CareerGoal,

                Education = new EducationDto
                {
                    Major = profile.EduMajor,
                    School = profile.EduSchool,
                    Years = profile.EduYears,
                    Gpa = profile.EduGPA,
                    Courses = profile.EduCourses
                },

                Skills = new SkillsDto
                {
                    HardSkills = profile.HardSkills,
                    SoftSkills = profile.SoftSkills,
                    ForeignLanguage = profile.ForeignLanguage,
                    Certification = profile.Certification
                },
                
                Experience = profile.Experiences.Select(e => new ExperienceDto {
                    Company = e.Company,
                    Position = e.Position,
                    Duration = e.Duration,
                    Description = e.Description
                }).ToList(),

                Projects = profile.Projects.Select(p => new ProjectDto
                {
                    Name = p.Name,
                    Description = p.Description,
                    Link = p.Link
                }).ToList()
            };
            return Ok(profileDto);
        }

        [HttpPost] //api/UpdateProfile or tạo mới nếu chưa có
        public async Task<ActionResult<Profile>> UpdateProfile([FromBody] ProfileDto profileDto)
        {
            var userId = GetUserId();
            var profile = await _context.Profiles
                .Include(p => p.Experiences)
                .Include(p => p.Projects)
                .FirstOrDefaultAsync(p => p.UserId == userId);
            
            if(profile == null)
            {
                profile = new Profile {UserId = userId};
                _context.Profiles.Add(profile);
            }

            // Cập nhật thông tin cơ bản
            profile.FirstName = profileDto.FirstName;
            profile.LastName = profileDto.LastName;
            profile.Avatar = profileDto.Avatar;
            profile.Email = profileDto.Email;
            profile.Phone = profileDto.Phone;
            profile.Link = profileDto.Link;
            profile.Headline = profileDto.Headline;
            profile.Location = profileDto.Location;
            profile.CareerGoal = profileDto.CareerGoal;
            // Cập nhật Education
            profile.EduMajor = profileDto.Education.Major;
            profile.EduSchool = profileDto.Education.School;
            profile.EduYears = profileDto.Education.Years;
            profile.EduGPA = profileDto.Education.Gpa;
            profile.EduCourses = profileDto.Education.Courses;
            // Cập nhật Skills
            profile.HardSkills = profileDto.Skills.HardSkills;
            profile.SoftSkills = profileDto.Skills.SoftSkills;
            profile.ForeignLanguage = profileDto.Skills.ForeignLanguage;
            profile.Certification = profileDto.Skills.Certification;
            // Cập nhật Experience (Xóa cũ thêm mới để đơn giản)
            _context.Experiences.RemoveRange(profile.Experiences);
            profile.Experiences = profileDto.Experience.Select(e => new UserExperience
            {
                Company = e.Company,
                Position = e.Position,
                Duration = e.Duration,
                Description = e.Description
            }).ToList();
            // Cập nhật Projects (Xóa cũ thêm mới)
            _context.Projects.RemoveRange(profile.Projects);
            profile.Projects = profileDto.Projects.Select(p => new UserProject
            {
                Name = p.Name,
                Description = p.Description,
                Link = p.Link
            }).ToList();

            await _context.SaveChangesAsync();
            return Ok(new { message = "Cập nhật Profile thành công" });  
        }

        private int GetUserId()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if(userIdClaim == null)
            {
                throw new UnauthorizedAccessException();
            }
            return int.Parse(userIdClaim.Value);
        }
    }
}