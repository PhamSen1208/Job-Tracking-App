import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useJobStore } from "../store/useJobStore";
import JobForm from "../components/jobs/form/JobForm";
import type { JobFormState } from "../hooks/useJobForm";
import { toast } from "react-toastify";

const EditJob = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const {jobs, updateJob} = useJobStore();

    const [isSubmitting, setIsSubmitting] = useState(false);

    //Tìm job cần sửa
    const jobToEdit = jobs.find((job) => job.id == Number(id));
    //Nếu không tìm được sẽ về danh sách
    useEffect(() => {
        if(!jobToEdit){
            toast.error("Không tìm thấy công việc");
            navigate("/jobs");
        }
    }, [jobToEdit, navigate]);

    if(!jobToEdit) return null;

    const handleSubmit = async (formData: JobFormState) => {
        setIsSubmitting(true);
        try {
            await new Promise(resolve => setTimeout(resolve,1500));
            //Gọi hàm cập nhật
            updateJob(Number(id), formData as any);
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