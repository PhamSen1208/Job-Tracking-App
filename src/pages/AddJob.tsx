import { useState } from "react";
import type {
  jobStatus,
  jobType,
  jobPosition,
} from "../components/jobs/JobCard";

type JobFormState = {
  title: string;
  company: string;
  location: string;
  experience: string;
  salary: string;
  date: string;
  type: jobType;
  position: jobPosition;
  status: jobStatus;
  description: string;
};

const initialFormState: JobFormState = {
  title: "",
  company: "",
  location: "",
  experience: "",
  salary: "",
  date: "",
  type: "Full-time",
  position: "Intern",
  status: "Pending",
  description: "",
};

const AddJob = () => {
  const [form, setForm] = useState<JobFormState>(initialFormState);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: gọi API tạo job
    // Hiện tại chỉ log ra để bạn thấy dữ liệu form
    // eslint-disable-next-line no-console
    console.log("Submit job:", form);
  };

  const handleClear = () => {
    setForm(initialFormState);
  };

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

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-xl border border-slate-800 bg-slate-900/70 p-6 shadow-sm"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-200">
                Tên công việc
              </label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none ring-emerald-500/40 focus:border-emerald-500 focus:ring-2"
                placeholder="VD: Frontend Developer"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-200">
                Công ty
              </label>
              <input
                name="company"
                value={form.company}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none ring-emerald-500/40 focus:border-emerald-500 focus:ring-2"
                placeholder="VD: FPT Software"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-200">
                Địa điểm
              </label>
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none ring-emerald-500/40 focus:border-emerald-500 focus:ring-2"
                placeholder="Địa chỉ hoặc Remote"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-200">
                Kinh nghiệm
              </label>
              <input
                name="experience"
                value={form.experience}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none ring-emerald-500/40 focus:border-emerald-500 focus:ring-2"
                placeholder="VD: Không yêu cầu, &gt; 2 năm..."
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-200">
                Mức lương
              </label>
              <input
                name="salary"
                value={form.salary}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none ring-emerald-500/40 focus:border-emerald-500 focus:ring-2"
                placeholder="VD: 8.000.000đ"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-200">
                Ngày apply
              </label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none ring-emerald-500/40 focus:border-emerald-500 focus:ring-2"
                required
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-200">
                  Hình thức
                </label>
                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none ring-emerald-500/40 focus:border-emerald-500 focus:ring-2"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-200">
                  Vị trí
                </label>
                <select
                  name="position"
                  value={form.position}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none ring-emerald-500/40 focus:border-emerald-500 focus:ring-2"
                >
                  <option value="Intern">Intern</option>
                  <option value="Fresher">Fresher</option>
                  <option value="Junior">Junior</option>
                  <option value="Middle">Middle</option>
                  <option value="Senior">Senior</option>
                  <option value="TechLead">TechLead</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-200">
                Trạng thái
              </label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none ring-emerald-500/40 focus:border-emerald-500 focus:ring-2"
              >
                <option value="Interview">Interview</option>
                <option value="Pending">Pending</option>
                <option value="Reject">Reject</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-200">
                Ghi chú
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none ring-emerald-500/40 focus:border-emerald-500 focus:ring-2"
                placeholder="Những thông tin quan trọng về job này..."
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={handleClear}
            className="rounded-lg border border-slate-700 px-5 py-2 text-sm font-medium text-slate-200 hover:border-slate-500 hover:bg-slate-800/60"
          >
            Clear
          </button>
          <button
            type="submit"
            className="rounded-lg bg-emerald-500 px-5 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400"
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddJob;

