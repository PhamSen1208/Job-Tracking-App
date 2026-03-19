import { Link } from "react-router-dom";
import location from "../../assets/images/location.svg";
import date from "../../assets/images/date.svg";
import { memo } from "react";
import { STATUS_COLORS, TYPE_COLORS, POSITION_COLORS } from "../../constants/jobConstants"
import type {JobStatus, JobType, JobPosition} from "../../constants/jobConstants"

export type Job = {
    id: number;
    title : string;
    company : string;
    location: string;
    experience: string;
    salary: string;
    date: string;
    type: JobType;
    position: JobPosition;
    status: JobStatus;
};

type JobCardProps = {
    job: Job;
}


const JobCard = memo(({job}: JobCardProps ) => {
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
                <span className={`rounded-lg px-4 py-2 text-xs ${TYPE_COLORS[job.type]}`}>
                    {job.type}
                </span>

                <span className={`rounded-lg px-4 py-2 text-xs ${POSITION_COLORS[job.position]}`}>
                    {job.position}
                </span>

                <span className={`rounded-lg px-4 py-2 text-xs font-semibold ${STATUS_COLORS[job.status]}`}>
                    {job.status}
                </span>
            </div>

            <div className="flex items-center justify-end px-6 py-4 gap-4 border-t border-slate-800">
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
},(prev, next) => {
    return (
    prev.job.id === next.job.id &&
    prev.job.title === next.job.title &&
    prev.job.status === next.job.status &&
    prev.job.company === next.job.company &&
    prev.job.location === next.job.location &&
    prev.job.date === next.job.date &&
    prev.job.type === next.job.type &&
    prev.job.position === next.job.position &&
    prev.job.experience === next.job.experience
  );
})
export default JobCard


