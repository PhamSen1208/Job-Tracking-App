import { Link } from "react-router-dom";
import location from "../../assets/images/location.svg";
import date from "../../assets/images/date.svg";


export type jobStatus = "Interview" | "Pending"| "Reject";
export type jobType = "Full-time" | "Part-time" | "Remote";
export type jobPosition = "Intern" | "Fresher" | "Junior" | "Middle" | "Senior" | "TechLead";

export type Job = {
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
};

const statusClasses: Record<jobStatus,string> = {
    Interview: "bg-indigo-50 text-indigo-600 border border-indigo-100",
    Pending: "bg-amber-50 text-amber-600 border border-amber-100",
    Reject: "bg-emerald-600 text-slate-50 border border-emerald-100"
};

type JobCardProps = {
    job: Job;
}

const JobCard = ({job}: JobCardProps ) => {
    return (
        <article className="flex flex-col rounded border border-slate-800 bg-slate-900/60 shadow-sm">

            <div className="flex gap-4 px-6 py-4 border-slate-800 border-b">
                <div className="flex h-14 w-14 items-center justify-center rounded bg-emerald-600 text-3xl font-semibold">
                    {job.title.charAt(0)}
                </div>
                <div className="justify-center flex flex-1 flex-col gap-2.5">
                    <h2 className="text-base font-semibold text-slate-50">
                        {job.title}
                    </h2>
                    <p className="text-sm text-slate-400 font-medium">{job.company}</p>
                </div>
            </div>

            <div className="flex flex-1 justify-between items-center">
                <div className="flex flex-wrap px-6 py-4 gap-2 items-center">
                    <img src={location} alt="Location"/>
                    <span className="text-sm text-slate-300">{job.location}</span>
                </div>

                <div className="flex flex-wrap px-6 py-4 gap-2">
                    <img src={date} alt="Date"/>
                    <span className="text-sm text-slate-300">{job.date}</span>
                </div>
            </div>

            <div className="flex items-center px-6 py-4 gap-4">
                <span className="rounded-lg bg-slate-800 px-4 py-2 text-xs">
                    {job.type}
                </span>

                <span className="rounded-lg bg-amber-700 px-4 py-2 text-xs">
                    {job.position}
                </span>

                <span
                    className={`rounded-lg px-4 py-2 text-xs font-semibold ${
                    statusClasses[job.status]}`}>
                    {job.status}
                </span>

                <span className="rounded-lg bg-sky-700 px-4 py-2 text-xs">
                    {job.experience}
                </span>

                <span className="rounded-lg bg-olive-500 px-4 py-2 text-xs">
                    {job.salary}
                </span>

                
            </div>

            <div className="flex items-center px-6 py-4 gap-4 border-t border-slate-800">
                <Link 
                    to={`/jobs/${job.id}`}
                    className="rounded-lg bg-emerald-300/90 px-6 py-2 text-sm font-semibold text-emerald-900 hover:bg-emerald-600/90">
                    Sửa
                </Link>

                <button 
                    className="rounded-lg bg-rose-300/90 px-6 py-2 text-sm font-semibold text-rose-900 hover:bg-rose-600/90">
                    Xóa
                </button>
            </div>
        </article>
    )
}
export default JobCard


