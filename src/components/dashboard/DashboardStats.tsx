import pending from "../../assets/images/Pending.svg";
import schedule from "../../assets/images/Schedule.svg";
import reject from "../../assets/images/Reject.svg";
import { useJobStats } from "../../hooks/useJobStats"
import { useJobStore } from "../../store/useJobStore";

const DashboardStats = () => {

  const jobs = useJobStore(state => state.jobs)
  const stats = useJobStats(jobs)

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {/*Pending*/}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-4">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
          Đang ứng tuyển
        </p>
        <div className="flex justify-between items-center px-4">
          <p className="mt-2 text-5xl font-bold text-emerald-400">{stats.pending}</p>
          <img 
            src={pending} 
            alt="job pending logo" 
            className="w-24 h-24 object-fill"/>
        </div>
        <p className="text-xs text-slate-400">Tổng số công ty mà bạn đã nộp CV</p>
      </div>

      {/*Schedule*/}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-4">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
          Đã lên lịch phỏng vấn
        </p>        
        <div className="flex justify-between items-center px-4">
          <p className="mt-2 text-5xl font-bold text-emerald-400 hover:text-emerald-300 hover: cursor-pointer">{stats.interview}</p>
          <img 
            src={schedule} 
            alt="job schedule logo" 
            className="w-24 h-24 object-fill"/>
        </div>
        <p className="text-xs text-slate-400">Tổng số công ty lên lịch phỏng vấn bạn</p>
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-4">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
          Đã bị từ chối
        </p>
        
        <div className="flex justify-between items-center px-4">
          <p className="mt-2 text-5xl font-bold text-emerald-400">{stats.reject}</p>
          <img 
            src={reject} 
            alt="job reject logo" 
            className="w-24 h-24 object-fill"/>
        </div>

        <p className="text-xs text-slate-400 mt-2">Tổng số công ty không phản hồi</p>
      </div>
    </div>
  );
};

export default DashboardStats;

