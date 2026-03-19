import type { JobFormState } from "./form/useJobForm";
import { FaBuilding, FaMapMarkerAlt, FaCalendarAlt, FaMoneyBillWave, FaUserTie, FaFlag, FaStar, FaBriefcase, FaAlignLeft} from "react-icons/fa";
import mainlogo from "../../assets/images/mainlogo.svg";
import { Link } from "react-router-dom";

// Tách component nhỏ cho từng phần
function JobDetailHeader({ title, company }: { title: string; company: string }) {
  return (
    <div className="flex items-center gap-6 border-b border-slate-700/50 pb-6 mb-6 w-full">
      <div className="h-20 w-20 rounded-xl bg-slate-800 border border-slate-700/50 flex items-center justify-center shadow-sm overflow-hidden p-2">
        <img src={mainlogo} alt={company || "Company Logo"} className="object-contain w-full h-full" />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-slate-100 mb-1 tracking-tight">{title}</h2>
        <div className="text-slate-400 text-base font-medium flex items-center gap-2">
          <FaBuilding className="text-slate-500" /> {company}
        </div>
      </div>
    </div>
  );
}

function JobDetailInfo({ job }: { job: JobFormState }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 w-full">

      <div className="flex items-center gap-3 text-base text-slate-300 py-2 border-b border-slate-800/50">
        <span className="p-2 bg-slate-800/50 rounded-lg">
          <FaMapMarkerAlt className="text-emerald-500" />
        </span>
        <span className="truncate text-sm">Địa điểm: {job.location}</span>
      </div>

      <div className="flex items-center gap-3 text-base text-slate-300 py-2 border-b border-slate-800/50">
        <span className="p-2 bg-slate-800/50 rounded-lg">
          <FaCalendarAlt className="text-blue-500" />
        </span>
        <span className="text-sm">Ngày nộp: {job.date}</span>
      </div>

      <div className="flex items-center justify-between gap-3 text-base text-slate-300 py-2 border-b border-slate-800/50">
        <div className="flex items-center gap-3">
          <span className="p-2 bg-slate-800/50 rounded-lg"><FaUserTie className="text-purple-500" /></span>
          <span className="font-medium text-slate-200">Hình thức: {job.type}</span>
        </div>
      </div>

      <div className="flex items-center gap-3 text-base text-slate-300 py-2 border-b border-slate-800/50">
        <span className="p-2 bg-slate-800/50 rounded-lg"><FaMoneyBillWave className="text-green-500" /></span>
        <span className="font-medium text-emerald-400">Tiền lương: {job.salary}</span>
      </div>

      <div className="flex items-center gap-3 text-base text-slate-300 py-2 border-b border-slate-800/50">
        <span className="p-2 bg-slate-800/50 rounded-lg"><FaStar className="text-yellow-500" /></span>
        <span className="font-medium text-slate-200">Kỹ năng: {job.skills}</span>
      </div>

      <div className="flex items-center gap-3 text-base text-slate-300 py-2 border-b border-slate-800/50">
        <span className="p-2 bg-slate-800/50 rounded-lg"><FaFlag className="text-orange-500" /></span>
        <span className="rounded-md border border-slate-700/60 bg-slate-800/40 px-2.5 py-1 text-xs font-semibold text-slate-300 tracking-wide">
          Trạng thái: {job.status}
        </span>
      </div>

      <div className="flex items-center justify-between gap-3 text-base text-slate-300 py-2 border-b border-slate-800/50">
        <div className="flex items-center gap-3">
          <span className="p-2 bg-slate-800/50 rounded-lg"><FaBriefcase className="text-pink-500" /></span>
          <span className="font-medium text-slate-200">Vị trí ứng tuyển: {job.position}</span>
        </div>
      </div>

      <div className="flex items-center gap-3 text-base text-slate-300 py-2 border-b border-slate-800/50">
        <span className="p-2 bg-slate-800/50 rounded-lg"><FaAlignLeft/></span>
        <span className="font-medium">Kinh nghiệm: {job.experience}</span>
      </div>
    </div>
  );
}

function JobDetailDescription({ description }: { description: string }) {
  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold text-slate-100 mb-3 flex items-center gap-2">
        <span className="h-4 w-1 bg-emerald-500 rounded-full"></span>
        Mô tả công việc
      </h3>
      <div className="text-slate-300 whitespace-pre-line text-sm md:text-base leading-relaxed bg-slate-800/30 border border-slate-700/50 rounded-xl p-5">
        {description}
      </div>
    </div>
  );
}

// Main JobDetail component
export default function JobInfo({ job }: { job: JobFormState }) {
  return (
    <div className="w-full max-w-4xl mx-auto bg-slate-900 rounded-2xl shadow-xl p-8 mt-12 border border-slate-800 flex flex-col items-start transition-all hover:border-slate-700/60">
      <JobDetailHeader title={job.title} company={job.company} />
      <JobDetailInfo job={job} />
      <JobDetailDescription description={job.description} />

      <div className="flex gap-4 mt-8 w-full border-t border-slate-700/50 pt-6 justify-between">
        <Link 
          to="/jobs"
          className="px-5 py-2.5 rounded-lg bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-300 font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500">
            Trở về danh sách
        </Link>

        <div className="flex gap-4">
          <button className="px-5 py-2.5 rounded-lg bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-300 font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500">
          Xóa
        </button>
        <button className="px-5 py-2.5 rounded-lg bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-200 font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500">
          Cập nhật
        </button>
        <button className="px-6 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/50">
          Ứng tuyển ngay
        </button>
        </div>
      </div>
    </div>
  );
}
