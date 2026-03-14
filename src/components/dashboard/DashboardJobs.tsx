import { Link } from "react-router-dom";

const DashboardJobs = () => {
  return (
    <div className="space-y-4 rounded-xl border border-slate-800 bg-slate-900/60 p-4 lg:col-span-2">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-sm font-semibold text-slate-100">
          Job bạn đang theo dõi
        </h2>
        <Link 
          to={"/jobs"}
          className="text-xs font-medium text-emerald-400 hover:text-emerald-300 underline hover:cursor-pointer " >Xem tất cả</Link>
      </div>
      
      <ul className="divide-y divide-slate-800 text-sm">
        <li className="flex items-center justify-between py-3">
          <div>
            <p className="font-medium text-slate-100">Frontend Developer</p>
            <p className="text-xs text-slate-500">Công ty A · Hà Nội</p>
          </div>
          <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
            Đang ứng tuyển
          </span>
        </li>
        <li className="flex items-center justify-between py-3">
          <div>
            <p className="font-medium text-slate-100">Backend Engineer</p>
            <p className="text-xs text-slate-500">Công ty B · TP. HCM</p>
          </div>
          <span className="rounded-full bg-slate-700/60 px-3 py-1 text-xs text-slate-200">
            Đã lưu
          </span>
        </li>
        <li className="flex items-center justify-between py-3">
          <div>
            <p className="font-medium text-slate-100">Product Manager</p>
            <p className="text-xs text-slate-500">Startup C · Remote</p>
          </div>
          <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs text-amber-400">
            Chờ phản hồi
          </span>
        </li>
      </ul>
    </div>
  );
};

export default DashboardJobs;

