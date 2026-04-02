import JobCard from "../components/jobs/JobCard";
import { useJobs } from "../context/JobContext";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const Jobs = () => {
  const { jobs, isLoading } = useJobs(); // Lấy danh sách job từ API
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
    const matchStatus = filterStatus === "All" || job.status === filterStatus;
    const matchType = filterType === "All" || job.type === filterType;
    const matchPosition = filterPosition === "All" || job.position === filterPosition;

    return matchSearch && matchStatus && matchType && matchPosition;
  })

  // PHÂN TRANG
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(filterJobs.length / itemsPerPage);
  
  // Lấy danh sách job cho trang hiện tại
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentJobs = filterJobs.slice(indexOfFirstItem, indexOfLastItem);

  const resetFilters = () => {
    setSearchWord("");
    setFilterStatus("All");
    setFilterType("All");
    setFilterPosition("All");
    setCurrentPage(1);
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <p className="text-xl text-emerald-500 animate-pulse font-medium">Đang đồng bộ dữ liệu...</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-slate-900/40 p-6 mb-8 border border-slate-800 rounded-2xl shadow-xl flex flex-col gap-6">  
        {/*Thanh tìm kiếm*/}
          <div className="relative w-full">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Tên công việc hoặc công ty..."
              value={searchWord}
              onChange={(e) => {
                setSearchWord(e.target.value);
                setCurrentPage(1); // Reset trang khi search
              }}
              className="input-base pl-12"
            />
        </div>
        {/*Bộ lọc*/}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select
            value={filterStatus}
            onChange={(e) => {
                setFilterStatus(e.target.value);
                setCurrentPage(1);
            }}
            className="input-base">
              <option value="All">Tất cả trạng thái</option>
              <option value="Interview">Phỏng vấn</option>
              <option value="Pending">Đang chờ</option>
              <option value="Reject">Đã loại</option>
          </select>
          {/*Bộ lọc loại công việc*/}
          <select
            value={filterType}
            onChange={(e) => {
                setFilterType(e.target.value);
                setCurrentPage(1);
            }}
            className="input-base">
              <option value="All">Mọi hình thức</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Remote">Remote</option>
          </select>
          {/*Bộ lọc vị trí*/}
          <select
            value={filterPosition}
            onChange={(e) => {
                setFilterPosition(e.target.value);
                setCurrentPage(1);
            }}
            className="input-base">
              <option value="All">Mọi trình độ</option>
              <option value="Intern">Intern</option>
              <option value="Fresher">Fresher</option>
              <option value="Junior">Junior</option>
              <option value="Middle">Middle</option>
              <option value="Senior">Senior</option>
              <option value="TechLead">TechLead</option>
          </select>

          <button 
            onClick={resetFilters}
            className="px-5 py-2.5 bg-slate-800 text-slate-200 font-semibold rounded-lg hover:bg-slate-700 transition-colors">
            Làm mới
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <span className="text-slate-400">
           Tìm thấy <span className="text-emerald-500 font-bold">{filterJobs.length}</span> kết quả
        </span>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {currentJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
        {currentJobs.length === 0 && (
            <div className="col-span-2 py-20 text-center">
                <p className="text-slate-500 italic">Không có công việc nào khớp với tìm kiếm của bạn.</p>
            </div>
        )}
      </div>

      {/* ĐIỀU KHIỂN PHÂN TRANG */}
      {totalPages > 1 && (
        <div className="mt-12 flex justify-center items-center gap-2 mb-10">
            <button 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
                className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-400 hover:bg-slate-800 disabled:opacity-20 transition-all hover: cursor-pointer"
            >
                Trước
            </button>
            
            {[...Array(totalPages)].map((_, index) => (
                <button
                    key={index + 1}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`w-10 h-10 rounded-lg font-bold transition-all hover: cursor-pointer ${
                        currentPage === index + 1 
                        ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20" 
                        : "bg-slate-900 text-slate-500 border border-slate-800 hover:bg-slate-800"
                    }`}
                >
                    {index + 1}
                </button>
            ))}

            <button 
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
                className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-400 hover:bg-slate-800 disabled:opacity-20 transition-all"
            >
                Sau
            </button>
        </div>
      )}
    </>
  );
};

export default Jobs;