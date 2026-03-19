import TextField from "./fields/TextField";
import SelectField from "./fields/SelectField";
import TextAreaField from "./fields/TextAreaField";
import { useFormValidation } from "../../../hooks/useFormValidation";
import { INITIAL_JOB_FORM } from "./useJobForm";
import type { JobFormState } from "./useJobForm";
import { FaBuilding, FaMapMarkerAlt, FaCalendarAlt, FaBriefcase, FaMoneyBillWave } from "react-icons/fa";
import { FaSackXmark } from "react-icons/fa6";
import { useJobStore } from "../../../store/useJobStore";

type JobFormProps = {
  onSubmit?: (form: JobFormState) => void
  isLoading?: boolean
}

const jobValidationRules = {
  title: (value: string) => !value.trim() ? "Tên công việc không được để trống" : null,
  company: (value: string) => !value.trim() ? "Tên công ty không được để trống" : null,
  location: (value: string) => !value.trim() ? "Địa điểm không được để trống" : null,
  date: (value: string) => !value ? "Ngày apply không được để trống" : null,
}

const JobForm = ({ onSubmit, isLoading = false }: JobFormProps) => {

  const addJob = useJobStore((state) => state.addJob);
  const { form, errors, validate, handleChange, reset } = useFormValidation(
    INITIAL_JOB_FORM,
    jobValidationRules
  )
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return;

    //lưu job vô form
    addJob(form as any);
    reset();

    if (onSubmit) {
      onSubmit(form)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-xl border border-slate-800 bg-slate-900/70 p-6 shadow-sm">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div>
            <TextField
              label="Tên công việc"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="VD: Frontend Developer"
              icon={<FaBriefcase className="text-emerald-500 text-base" />}
              required
            />
            {errors.title && (
              <p className="mt-1 text-xs text-red-400">{errors.title}</p>
            )}
          </div>

          <div>
            <TextField
              label="Công ty"
              name="company"
              value={form.company}
              onChange={handleChange}
              placeholder="VD: FPT Software"
              icon={<FaBuilding className="text-emerald-500 text-base" />}
              required
            />
            {errors.company && (
              <p className="mt-1 text-xs text-red-400">{errors.company}</p>
            )}
          </div>

          <div>
            <TextField
              label="Địa điểm"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Địa chỉ hoặc Remote"
              icon={<FaMapMarkerAlt className="text-emerald-500 text-base" />}
              required
            />
            {errors.location && (
              <p className="mt-1 text-xs text-red-400">{errors.location}</p>
            )}
          </div>

          <TextField
            label="Kinh nghiệm"
            name="experience"
            value={form.experience}
            onChange={handleChange}
            placeholder="VD: Không yêu cầu, > 2 năm..."
            icon={<FaBriefcase className="text-emerald-500 text-base" />}
          />

          <TextField
            label="Mức lương"
            name="salary"
            value={form.salary}
            onChange={handleChange}
            placeholder="VD: 8.000.000đ"
            icon={<FaMoneyBillWave className="text-emerald-500 text-base" />}
          />

          <TextField
            label="Kỹ năng"
            name="skills"
            value={form.skills}
            onChange={handleChange}
            placeholder="VD: React, Node.js, MongoDB"
            icon={<FaSackXmark className="text-emerald-500 text-base" />}
          />
        </div>

        <div className="space-y-4">
          <div>
            <TextField
              label="Ngày apply"
              name="date"
              value={form.date}
              onChange={handleChange}
              type="date"
              icon={<FaCalendarAlt className="text-emerald-500 text-base" />}
              required
            />
            {errors.date && (
              <p className="mt-1 text-xs text-red-400">{errors.date}</p>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <SelectField
              label="Hình thức"
              name="type"
              value={form.type}
              onChange={handleChange}
              options={[
                { value: "Full-time", label: "Full-time" },
                { value: "Part-time", label: "Part-time" },
                { value: "Remote", label: "Remote" },
              ]}
            />

            <SelectField
              label="Vị trí"
              name="position"
              value={form.position}
              onChange={handleChange}
              options={[
                { value: "Intern", label: "Intern" },
                { value: "Fresher", label: "Fresher" },
                { value: "Junior", label: "Junior" },
                { value: "Middle", label: "Middle" },
                { value: "Senior", label: "Senior" },
                { value: "TechLead", label: "TechLead" },
              ]}
            />
          </div>

          <SelectField
            label="Trạng thái"
            name="status"
            value={form.status}
            onChange={handleChange}
            options={[
              { value: "Interview", label: "Interview" },
              { value: "Pending", label: "Pending" },
              { value: "Reject", label: "Reject" },
            ]}
          />

          <TextAreaField
            label="Ghi chú"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Ghi chú về job này..."
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-slate-700/50 mt-6">
        <button
          type="button"
          onClick={reset}
          disabled={isLoading}
          className="rounded-lg border border-slate-700 px-5 py-2 text-sm font-medium text-slate-300 hover:border-slate-500 hover:bg-slate-800/60 transition-colors"
        >
          Làm mới
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="rounded-lg bg-emerald-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 transition-colors"
        >
          {isLoading ? "Đang lưu..." : "Lưu công việc"}
        </button>
      </div>
    </form>
  );
};

export default JobForm;
