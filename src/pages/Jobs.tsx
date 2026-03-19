import JobCard from "../components/jobs/JobCard";
import { useJobStore } from "../store/useJobStore";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const Jobs = () => {
  const jobs = useJobStore((state) => state.jobs); //Lấy danh sách job từ store
  const [searchWord, setSearchWord] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterType, setFilterType] = useState("All");
  const [filterPosition, setFilterPosition] = useState("All");

  const filterJobs = jobs.filter((job) => {
    const keyWord = searchWord.toLowerCase();
    const matchSearch =
    job.title.toLowerCase().includes(keyWord) ||
    job.company.toLowerCase().includes(keyWord);

    //Kiểm tra trạng thái,... nếu để All thì pass còn không check xem có khớp tag status không
    const matchStatus = filterStatus == "All" || job.status == filterStatus;
    const matchType = filterType == "All" || job.type == filterType;
    const matchPosition = filterPosition == "All" || job.position == filterPosition;

    return matchSearch && matchStatus && matchType && matchPosition;
  })
  return (
    <>
      <div className="bg-slate-900/50 w-[80%] p-6 mb-8 border border-slate-700 rounded-xl shadow-sm flex flex-col  md:items-center gap-4">  
        {/*Thanh tìm kiếm*/}
          <div className="relative w-full md:flex-1">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Tên công việc hoặc công ty..."
              value={searchWord}
              onChange={(e) => setSearchWord(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-600 bg-slate-800 text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
        </div>
        {/*Bộ lọc trạng thái*/}
        <div className="flex flex-col md:flex-row flex-wrap gap-4 w-full">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full md:w-52 bg-slate-800/50 border border-slate-700 text-slate-200 rounded-lg px-4 py-2.5 
            outline-none focus:border-emerald-500 transition-colors">
              <option value="">Tất cả</option>
              <option value="Interview">Interview</option>
              <option value="Pending">Pending</option>
              <option value="Reject">Reject</option>
          </select>
          {/*Bộ lọc loại công việc*/}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full md:w-52 bg-slate-800/50 border border-slate-700 text-slate-200 rounded-lg px-4 py-2.5 
            outline-none focus:border-emerald-500 transition-colors">
              <option value="">Tất cả</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Remote">Remote</option>
          </select>
          {/*Bộ lọc vị trí*/}
          <select
            value={filterPosition}
            onChange={(e) => setFilterPosition(e.target.value)}
            className="w-full md:w-52 bg-slate-800/50 border border-slate-700 text-slate-200 rounded-lg px-4 py-2.5 
            outline-none focus:border-emerald-500 transition-colors">
              <option value="">Tất cả</option>
              <option value="Intern">Intern</option>
              <option value="Fresher">Fresher</option>
              <option value="Junior">Junior</option>
              <option value="Middle">Middle</option>
              <option value="Senior">Senior</option>
              <option value="TechLead">TechLead</option>
          </select>

          {/*Nut reset bo loc */}
          <button 
            onClick={() => 
            {
              setSearchWord("");
              setFilterStatus("All");
            }}
            className="px-5 py-2.5 mx-auto md:mx-10 bg-red-800 text-slate-50 font-semibold rounded-lg hover:bg-red-600 transition-colors whitespace-nowrap">
            Làm mới
          </button>
        </div>
        
      </div>


      <span className="flex text-lg text-slate-300 font-semibold mb-6">
        Tìm thấy {filterJobs.length} kết quả
      </span>
      <div className="grid gap-6 md:grid-cols-2">
        {filterJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </>
  );
};

export default Jobs;