import { useState } from "react";
import JobForm from "../components/jobs/form/JobForm";
import type { JobFormState } from "../components/jobs/form/useJobForm";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useJobStore } from "../store/useJobStore";

const AddJob = () => {
  const addJob = useJobStore(state => state.addJob);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const [isSubmitError, setIsSubmitError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleFormSubmit = async (formData: JobFormState) => {
    setIsSubmitting(true);
    setIsSubmitSuccess(false);
    setIsSubmitError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      addJob(formData as any);
      setIsSubmitSuccess(true);
      navigate("/jobs");
      toast.success("Job đã được lưu thành công!");
      //Clear form và show thông báo
      setTimeout(() => setIsSubmitSuccess(false), 2000);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Thêm công việc thất bại"
      setIsSubmitError(message);
    }
    finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-50">
          Thêm công việc mới
        </h1>
        <p className="text-sm text-slate-400">
          Điền thông tin chi tiết cho job bạn muốn lưu hoặc theo dõi.
        </p>
      </header>

      {isSubmitError && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
          {isSubmitError}
        </div>
      )}

      {isSubmitSuccess && (
        <div className="rounded-lg border border-green-500/30 bg-green-500/10 p-4 text-sm text-green-400">
          ✓ Job đã được lưu thành công!
        </div>
      )}
      <JobForm onSubmit={handleFormSubmit} isLoading={isSubmitting} />
    </section>
  );
};

export default AddJob;

