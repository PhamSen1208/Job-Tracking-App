import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useJobs } from "../context/JobContext";
import type { Job } from "../components/jobs/JobCard";
import JobForm from "../components/jobs/form/JobForm";
import type { JobFormState } from "../hooks/useJobForm";
import { toast } from "react-toastify";

const EditJob = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const { updateJob, fetchJob } = useJobs();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [jobToEdit, setJobToEdit] = useState<Job | null>(null);

    // Lấy chi tiết công việc từ API
    useEffect(() => {
        if (id) {
            fetchJob(Number(id))
                .then(job => {
                    if (job) setJobToEdit(job);
                    else {
                        toast.error("Không tìm thấy công việc");
                        navigate("/jobs");
                    }
                })
                .catch(() => {
                    toast.error("Lỗi khi tải công việc");
                    navigate("/jobs");
                })
                .finally(() => setIsLoading(false));
        }
    }, [id, fetchJob, navigate]);

    if (isLoading) {
        return <div className="min-h-[50vh] flex justify-center items-center text-emerald-500 animate-pulse">Đang tải dữ liệu...</div>;
    }
    if (!jobToEdit) return null;

    const handleSubmit = async (formData: JobFormState) => {
        setIsSubmitting(true);
        try {
            await updateJob(Number(id), formData as any);
            toast.success("Cập nhật thành công!");
            navigate(`/jobs/${id}`);
        } catch (error) {
            toast.error("Cập nhật thất bại!");
        }
        finally
        {
            setIsSubmitting(false);
        }
    }

    return (
        <section className="space-y-6">
            <header className="space-y-1">
                <h1 className="text-2xl font-semibold tracking-tight text-slate-50">
                    Chỉnh sửa công việc
                </h1>
                <p className="text-sm text-slate-400">
                    Cập nhật các thông tin mới nhất cho job này.
                </p>
            </header>

            <JobForm 
                onSubmit={handleSubmit} 
                isLoading={isSubmitting} 
                initialData={jobToEdit as any} 
            />
        </section>
    );
};

export default EditJob;