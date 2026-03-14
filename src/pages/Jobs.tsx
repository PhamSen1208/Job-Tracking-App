import JobCard from "../components/jobs/JobCard";

type jobStatus = "Interview" | "Pending"| "Reject";
type jobType = "Full-time" | "Part-time" | "Remote";
type jobPosition = "Intern" | "Fresher" | "Junior" | "Middle" | "Senior" | "TechLead" ;

type Job = {
  id: number;
  title : string;
  company : string;
  location: string;
  experience: string;
  salary: string;
  date: string;
  type:jobType;
  position:jobPosition;
  status:jobStatus;
}

const mockJobs: Job[] = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Sao vàng Tech",
    experience: "Không yêu cầu",
    location: "112 Duy Tân, Cầu Giấy, Hà Nội",
    salary: "4.000.000đ",
    date: "11/03/2026",
    type: "Full-time",
    position: "Intern",
    status: "Interview"
  },

  {
    id: 2,
    title: "Backend Developer",
    company: "FPT Software",
    experience: "Không yêu cầu",
    location: "87 Duy Tân, Cầu Giấy, Hà Nội",
    salary: "8.000.000đ",
    date: "20/03/2026",
    type: "Full-time",
    position: "Fresher",
    status: "Pending"
  },

  {
    id: 3,
    title: "Frontend Developer",
    company: "VTI",
    experience: "Không yêu cầu",
    location: "1 Dương Đình Nghệ, Mỹ Đình, Hà Nội",
    salary: "3.000.000đ",
    date: "11/03/2026",
    type: "Full-time",
    position: "Intern",
    status: "Interview"
  },

  {
    id: 4,
    title: "FullStack Developer",
    company: "KaopizVN",
    experience: "> 2 năm kinh nghiệm",
    location: "56 Bùi Thùy Trâm, Cầu Giấy, Hà Nội",
    salary: "14.000.000đ",
    date: "10/03/2026",
    type: "Remote",
    position: "Junior",
    status: "Reject"
  },
];

const Jobs = () => {
  return (
    <>
      <span className="flex text-lg text-slate-300 font-semibold mb-6">Tìm thấy 25 kết quả</span>
      <div className="grid gap-6 md:grid-cols-2">
        {mockJobs.map((job) => (
          <JobCard key={job.id} job={job}/>
        ))}
      </div>
    </>
  );
};

export default Jobs;