import { Link } from "react-router-dom";

const DashboardSuggestions = () => {
  return (
    <aside className="space-y-4 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
      <h2 className="text-sm font-semibold text-slate-100">Gợi ý cho bạn</h2>
      <p className="text-xs text-slate-400">
        Hoàn thiện hồ sơ và cập nhật kỹ năng giúp tăng cơ hội được nhà tuyển
        dụng chú ý.
      </p>
      <div className="space-y-2 text-xs text-slate-300">
        <div className="flex items-center justify-between">
          <span>Hoàn thiện hồ sơ</span>
          <span className="text-emerald-400">60%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
          <div className="h-full w-3/5 rounded-full bg-emerald-500" />
        </div>
      </div>
      <Link to={"/profile"} className="flex items-center justify-center mx-auto md:w-1/2 mt-2 rounded-lg bg-emerald-500 px-3 py-2 text-xs font-medium text-slate-950 hover:bg-emerald-400 hover:cursor-pointer">
        Cập nhật hồ sơ ngay
      </Link>
    </aside>
  );
};

export default DashboardSuggestions;

