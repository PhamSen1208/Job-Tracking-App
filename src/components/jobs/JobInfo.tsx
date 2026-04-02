import type { Job, JobHistory } from "./JobCard";
import { 
    FaBuilding, FaMapMarkerAlt, FaCalendarAlt, FaMoneyBillWave, 
    FaBriefcase, FaEnvelope, FaPhone, FaUserTie, FaCheckCircle, 
    FaClock, FaTimesCircle, FaTags, FaLayerGroup, FaTimes
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface JobInfoProps {
    job: Job;
    histories: JobHistory[];
}

const getStatusColor = (status: Job["status"]) => {
    switch (status) {
        case "Interview": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
        case "Pending": return "bg-amber-500/10 text-amber-400 border-amber-500/20";
        case "Reject": return "bg-rose-500/10 text-rose-400 border-rose-500/20";
        default: return "bg-slate-500/10 text-slate-400 border-slate-500/20";
    }
};

const getStatusIcon = (status: Job["status"]) => {
    switch (status) {
        case "Interview": return <FaUserTie />;
        case "Pending": return <FaClock />;
        case "Reject": return <FaTimesCircle />;
        default: return <FaCheckCircle />;
    }
}

const JobInfo = ({ job, histories }: JobInfoProps) => {
    const navigate = useNavigate();

    return (
        <div className="relative w-full max-w-4xl bg-slate-900/40 border border-slate-800 p-8 rounded-3xl shadow-2xl backdrop-blur-xl transition-all hover:border-slate-700/50">
            {/* Close Button */}
            <button 
                onClick={() => navigate('/jobs')}
                className="absolute top-1 right-1 p-2 rounded-full bg-slate-800/50 text-slate-400 hover:text-rose-500 hover:bg-rose-500/20 transition-all z-10"
                title="Đóng"
            >
                <FaTimes size={18} />
            </button>

            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 border-b border-slate-800/50 pb-8 pt-2">
                <div>
                    <h1 className="text-3xl font-bold text-slate-50 tracking-tight mb-2">
                        {job.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-4 text-slate-400">
                        <span className="flex items-center gap-2 hover:text-emerald-400 transition-colors">
                            <FaBuilding className="text-emerald-500" />
                            {job.company}
                        </span>
                        <span className="flex items-center gap-2">
                            <FaMapMarkerAlt className="text-emerald-500" />
                            {job.location}
                        </span>
                        <span className="flex items-center gap-2">
                            <FaCalendarAlt className="text-emerald-500" />
                            Ngày nộp: {new Date(job.date).toLocaleDateString("vi-VN")}
                        </span>
                    </div>
                </div>

                <div className={`flex items-center gap-2 px-4 py-2 rounded-full border ${getStatusColor(job.status)}`}>
                    {getStatusIcon(job.status)}
                    <span className="font-medium">{job.status}</span>
                </div>
            </div>

            {/* Main Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-6">
                    <div>
                        <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-3">Thông tin chung</h3>
                        <div className="bg-slate-950/50 rounded-2xl p-4 border border-slate-800 space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                                    <FaMoneyBillWave />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-400">Mức lương</p>
                                    <p className="font-semibold text-slate-200">{job.salary}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                                    <FaBriefcase />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-400">Kinh nghiệm</p>
                                    <p className="font-semibold text-slate-200">{job.experience}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-3">Chi tiết công việc</h3>
                        <div className="flex flex-wrap gap-2">
                            <span className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 text-slate-300 rounded-lg text-sm border border-slate-700">
                                <FaLayerGroup className="text-purple-400" />
                                {job.type}
                            </span>
                            <span className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 text-slate-300 rounded-lg text-sm border border-slate-700">
                                <FaTags className="text-amber-400" />
                                {job.position}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-3">Mô tả công việc</h3>
                        <div className="bg-slate-950/50 rounded-2xl p-5 border border-slate-800 prose prose-invert max-w-none hover:border-slate-700 transition-colors">
                            <p className="text-slate-300 whitespace-pre-line leading-relaxed text-sm">
                                {job.description || "Chưa có mô tả chi tiết cho công việc này."}
                            </p>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-3">Kỹ năng yêu cầu</h3>
                        <div className="flex flex-wrap gap-2">
                            {job.skills ? job.skills.split(',').map((skill, index) => (
                                <span key={index} className="px-3 py-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg text-sm font-medium">
                                    {skill.trim()}
                                </span>
                            )) : (
                                <span className="text-slate-500 text-sm italic">Không có yêu cầu kỹ năng cụ thể</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {/* 5. Thêm phần Lịch sử thay đổi (History) */}
            <div className="mt-8 pt-8 border-t border-slate-800/50">
                <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-6 flex items-center gap-2">
                    <FaClock className="text-emerald-500" />
                    Lịch sử trạng thái
                </h3>
                
                {histories && histories.length > 0 ? (
                    <div className="relative border-l border-slate-700/50 ml-4 space-y-6">
                        {histories.map((history, idx) => (
                            <div key={idx} className="relative pl-6">
                                {/* Dấu chấm trên trục thời gian */}
                                <div className="absolute w-3 h-3 bg-emerald-500 rounded-full -left-[6.5px] top-1.5 ring-4 ring-slate-900 border border-slate-900" />
                                
                                <div className="bg-slate-950/30 rounded-2xl p-4 border border-slate-800/80 hover:border-slate-700 transition-all">
                                    <p className="text-xs text-emerald-400 font-medium mb-1">
                                        {new Date(history.changedAt).toLocaleString("vi-VN")}
                                    </p>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-slate-500 line-through text-sm">{history.oldStatus}</span>
                                        <span className="text-slate-400 text-xs">➔</span>
                                        <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(history.newStatus as any)}`}>
                                            {history.newStatus}
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-300 italic">
                                        "{history.note}"
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-6 bg-slate-950/20 rounded-2xl border border-dashed border-slate-800">
                        <p className="text-slate-500 text-sm">Chưa có lịch sử thay đổi trạng thái nào.</p>
                    </div>
                )}
            </div>

            {/* Contact Section */}
            {(job.contactName || job.contactEmail || job.contactPhone) && (
                <div className="mt-8 pt-8 border-t border-slate-800/50">
                    <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-4">Thông tin liên hệ</h3>
                    <div className="flex flex-wrap gap-6 bg-slate-950/30 p-5 rounded-2xl border border-slate-800/80">
                        {job.contactName && (
                            <div className="flex items-center gap-3 text-slate-300">
                                <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400">
                                    <FaUserTie size={14} />
                                </div>
                                <span className="text-sm font-medium">{new Date(job.date).toLocaleDateString("vi-VN")}</span>
                            </div>
                        )}
                        {job.contactEmail && (
                            <div className="flex items-center gap-3 text-slate-300 hover:text-emerald-400 transition-colors cursor-pointer">
                                <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                                    <FaEnvelope size={14} />
                                </div>
                                <span className="text-sm font-medium">{job.contactEmail}</span>
                            </div>
                        )}
                        {job.contactPhone && (
                            <div className="flex items-center gap-3 text-slate-300 hover:text-blue-400 transition-colors cursor-pointer">
                                <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                                    <FaPhone size={14} />
                                </div>
                                <span className="text-sm font-medium">{job.contactPhone}</span>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default JobInfo;
