import JobInfo from "../components/jobs/JobInfo";
import { useParams, Link } from "react-router-dom";
// 1. Thêm các hook cần thiết
import { useEffect, useState } from "react";
import { useJobs } from "../context/JobContext";
import type { Job, JobHistory } from "../components/jobs/JobCard";

const JobDetail = () => {
  const { id } = useParams();
  // 2. Kéo hàm từ useJobs ra
  const { fetchJob, fetchJobHistories, isLoading, isError } = useJobs();
  
  // 3. Khai báo 2 cái kho rỗng để chờ hứng data thả từ API về
  const [job, setJob] = useState<Job | null>(null);
  const [histories, setHistories] = useState<JobHistory[]>([]);

  // 4. Kích hoạt bùa triệu hồi Data khi mới vào trang
  useEffect(() => {
    if (id) {
      const loadData = async () => {
        const fetchedJob = await fetchJob(Number(id));
        if (fetchedJob) setJob(fetchedJob);

        const fetchedHistories = await fetchJobHistories(Number(id));
        if (fetchedHistories) setHistories(fetchedHistories);
      };
      
      loadData();
    }
  }, [id, fetchJob, fetchJobHistories]);

  if (isLoading) {
      return (
        <main className="min-h-screen flex items-center justify-center bg-slate-950 text-emerald-500">
          <p className="text-xl animate-pulse">Đang tải dữ liệu mật...</p>
        </main>
      );
  }

  if (isError || !job) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-slate-50 gap-4">
        <h2 className="text-2xl text-rose-500">{(isError) ? isError : "Không tìm thấy công việc!"}</h2>
        <Link to="/jobs" className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4">
          Trở về Danh sách
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-50 py-12">
      {/* 5. Gửi hàng xuống component con! */}
      <JobInfo job={job} histories={histories} />
    </main>
  );
}

export default JobDetail;
