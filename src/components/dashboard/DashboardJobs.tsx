import { Link } from "react-router-dom";
import { useJobStore } from "../../store/useJobStore";

const DashboardJobs = () => {
  const {jobs} = useJobStore();
  //Lấy top 3 jobs
  const recentJobs = jobs.slice(0,3); 
  return (
    <div className="space-y-4 rounded-xl border border-slate-800 bg-slate-900/60 p-4 lg:col-span-2">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-sm font-semibold text-slate-100">
          Job bạn đang theo dõi ({jobs.length})
        </h2>
        <Link 
          to={"/jobs"}
          className="text-xs font-medium text-emerald-400 hover:text-emerald-300 underline hover:cursor-pointer " >
            Xem tất cả
        </Link>
      </div>
      
      <ul className="divide-y divide-slate-800 text-sm">
        {recentJobs.length > 0 ? (
          recentJobs.map(job => (
            <li key={job.id} className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-slate-100">{job.title}</p>
                <p className="text-xs text-slate-500">
                    {job.company} · {job.location}
                </p>
              </div>
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
                  {job.status}
              </span>
            </li>
          ))
        ) : (
          <li className="flex items-center justify-center py-6 text-slate-400">
            Chưa có job nào. <Link to="/add-job" className="ml-2 text-emerald-400">Thêm job →</Link>
          </li>
        )}
      </ul>
    </div>
  )
}
export default DashboardJobs;

