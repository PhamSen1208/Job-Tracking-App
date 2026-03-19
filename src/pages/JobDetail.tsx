import JobInfo from "../components/jobs/JobInfo"
import { useParams, Link } from "react-router-dom";
import { useJobStore } from "../store/useJobStore";


const JobDetail = () => {
  const {id} = useParams(); //Lấy id job
  const jobs = useJobStore(state => state.jobs);

  const job = jobs.find((job) => job.id == Number(id));

  if (!job) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-slate-50 gap-4">
        <h2 className="text-2xl text-slate-400">Không tìm thấy công việc!</h2>
        <Link to="/jobs" className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4">
          Trở về Danh sách
        </Link>
      </main>
    );
  }
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-50">
      <JobInfo job={job as any}/>
    </main>
  )
}

export default JobDetail

