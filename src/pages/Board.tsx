import { useJobs } from "../context/JobContext";
import { FaClock, FaCalendar, FaMapMarkerAlt, FaBriefcase, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const Board = () => {
    const { jobs, updateJob } = useJobs();
    
    // Phân loại job theo status
    const pendingJobs = jobs.filter(job => job.status === 'Pending');
    const interviewJobs = jobs.filter(job => job.status === 'Interview');
    const rejectJobs = jobs.filter(job => job.status === 'Reject');

    // Hàm đổi trạng thái
    const moveJob = (id: number, newStatus: "Pending" | "Interview" | "Reject") => {
        updateJob(id, { status: newStatus });
    };

    const ColumnHeader = ({ title, icon: Icon, color, count, borderColor }: any) => (
        <div className={`flex items-center justify-between mb-6 px-2 pb-3 border-b-2 ${borderColor}`}>
            <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${color} bg-opacity-20`}>
                    <Icon className={`${color.replace('bg-', 'text-')} text-white`} />
                </div>
                <h2 className="font-bold text-slate-100 tracking-wide uppercase text-sm">{title}</h2>
            </div>
            <span className="bg-slate-800 text-slate-400 px-2.5 py-1 rounded-full text-xs font-bold ring-1 ring-slate-700">
                {count}
            </span>
        </div>
    );

    const JobCard = ({ job, nextStatus, nextLabel }: any) => (
        <div className="group bg-slate-900/80 p-4 rounded-xl border border-slate-800 hover:border-slate-600 transition-all shadow-lg">
            <div className="flex justify-between items-start mb-2">
                <Link to={`/jobs/${job.id}`} className="font-bold text-slate-200 hover:text-emerald-400 transition-colors line-clamp-1">
                    {job.title}
                </Link>
                <span className="text-[10px] font-bold text-slate-500 uppercase">{job.position}</span>
            </div>
            
            <div className="space-y-2 mb-4">
                <p className="text-xs text-slate-400 flex items-center gap-1.5 line-clamp-1">
                    <FaBriefcase size={10} className="text-slate-600" /> {job.company}
                </p>
                <p className="text-xs text-slate-500 flex items-center gap-1.5">
                    <FaMapMarkerAlt size={10} className="text-slate-600" /> {job.location}
                </p>
            </div>

            <div className="flex gap-2 pt-3 border-t border-slate-800/50">
                {nextStatus && (
                    <button 
                        onClick={() => moveJob(job.id, nextStatus)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 text-[10px] font-bold hover:bg-emerald-500 hover:text-white transition-all"
                    >
                        {nextLabel} <FaArrowRight size={8} />
                    </button>
                )}
                {/* Nút loại chỉ hiển thị khi job không ở trạng thái Reject */}
                {job.status !== 'Reject' && (
                    <button 
                        onClick={() => moveJob(job.id, 'Reject')}
                        className="px-2 py-1.5 rounded-lg bg-red-500/10 text-red-500 text-[10px] font-bold hover:bg-red-500 hover:text-white transition-all"
                    >
                        Loại
                    </button>
                )}
            </div>
        </div>
    );

    return (
        <div className="min-h-[calc(100vh-120px)] w-full">
            <header className="mb-8">
                <h1 className="text-2xl font-bold text-slate-50 tracking-tight">Quy trình ứng tuyển</h1>
                <p className="text-sm text-slate-400">Theo dõi và cập nhật trạng thái các công việc trực quan.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start pb-10">
                {/* Cột 1: (pending)*/}
                <div className="bg-slate-900/40 rounded-2xl p-5 border border-slate-800/50 min-h-[500px]">
                    <ColumnHeader 
                        title="Đang chờ" 
                        icon={FaClock} 
                        color="bg-amber-500" 
                        borderColor="border-amber-500/50" 
                        count={pendingJobs.length} 
                    />
                    <div className="space-y-4">
                        {pendingJobs.map(job => (
                            <JobCard 
                                key={job.id} 
                                job={job} 
                                nextStatus="Interview" 
                                nextLabel="Mời phỏng vấn" />
                        ))}
                    </div>
                </div>

                {/* Cột 2: PHỎNG VẤN */}
                <div className="bg-slate-900/40 rounded-2xl p-5 border border-slate-800/50 min-h-[500px]">
                    <ColumnHeader   
                        title="Phỏng vấn" 
                        icon={FaCalendar} 
                        color="bg-blue-500"  
                        borderColor="border-blue-500/50" 
                        count={interviewJobs.length} 
                    />
                    <div className="space-y-4">
                        {interviewJobs.map(job => (
                            <JobCard key={job.id} job={job} nextStatus={null} nextLabel={null} />
                        ))}
                    </div>
                </div>

                {/* Cột 3: TỪ CHỐI */}
                <div className="bg-slate-900/40 rounded-2xl p-5 border border-slate-800/50 min-h-[500px]">
                    <ColumnHeader title="Đã dừng" icon={FaClock} color="bg-red-500" borderColor="border-red-500/50" count={rejectJobs.length} />
                    <div className="space-y-4 opacity-70 italic">
                        {rejectJobs.map(job => (
                            <JobCard key={job.id} job={job} nextStatus="Pending" nextLabel="Khôi phục" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Board;
