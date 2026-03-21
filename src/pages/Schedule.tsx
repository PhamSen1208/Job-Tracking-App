import schedule from "../assets/images/Schedule.svg"
import { useJobStore } from "../store/useJobStore";
import { FaCalendarCheck, FaBuilding } from "react-icons/fa";
import { Link } from "react-router-dom";

const Schedule = () => {
    //Lấy danh sách jobs lưu ở store
    const {jobs} = useJobStore();

    //Lọc ra các job có status là Interview
    const interviewJobs = jobs.filter((job) => job.status === "Interview");

    if(interviewJobs.length == 0)
    {
        return(
            <div className="text-center py-20 bg-slate-900/50 rounded-xl border border-dashed border-slate-700">
                <FaCalendarCheck className="text-6xl text-slate-600 mx-auto mb-4"/>
                <h2 className="text-xl font-medium text-slate-400 mb-2">Bạn chưa có lịch phỏng vấn nào sắp tới.</h2>
                <p className="text-slate-500 mt-2">Hãy tiếp tục rải CV nhé, cố lên!</p>

                <Link to="/add-job" className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 mt-4 rounded-lg transition-colors">
                    Thêm công việc
                </Link>
            </div>
        )
    }

    return(
        <div className="max-w-4xl mx-auto space-y-6">
            <header>
                <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-3">
                    <FaCalendarCheck className="text-emerald-500"/>
                    Lịch phỏng vấn của bạn
                </h1>
                <p className="text-slate-400 mt-1">Danh sách các công ty đã phản hồi và mời bạn phỏng vấn.</p>
            </header>
            <div className="grid gap-4">
                {interviewJobs.map((job) => (
                    <Link 
                        to={`/jobs/${job.id}`}
                        key={job.id}
                        className="flex items-center gap-6 p-5 bg-slate-900 border border-slate-800 rounded-xl hover:border-emerald-500/50 transition-all shadow-sm"
                        >
                        {/*Cột thời gian */}
                        <div className="flex">
                            <img 
                                src={schedule} 
                                alt="schedule job"
                                className="w-25 h- object-fill" 
                            />
                        </div>
                        {/* Cột thông tin */}
                        <div className="flex-1">
                            <h3 className="text-md font-semibold text-slate-100 group-hover:text-emerald-400 transition-colors">
                                Vị trí tuyển: {job.title}
                            </h3>
                            <div className="flex items-center gap-2 text-slate-400 text-sm mt-1">
                                <FaBuilding size={12} /> {job.company}
                            </div>
                        </div>
                        {/* Cột vị trí công việc*/}
                        <div className="text-xs font-bold capitalize tracking-widest text-emerald-300 bg-emerald-500/10 px-3 py-1 rounded">
                            Vị trí: {job.position}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )

    
};

export default Schedule;