import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Job = {
    id: number;
    title: string;
    company: string;
    location: string;
    experience: string;
    salary: string;
    date: string;
    description: string;
    skills: string;
    type: "Full-time" | "Part-time" | "Remote";
    position: "Intern" | "Fresher" | "Junior" | "Middle" | "Senior" | "TechLead";
    status: "Interview" | "Pending" | "Reject";
    contactName?: string;
    contactEmail?: string;
    contactPhone?: string;
};

//Tạo kho chứa các thông tin

type JobStore = {
    jobs: Job[];
    addJob: (newJob: Omit<Job, 'id'>) => void;
    updateJob: (id: number, updatedJob: Partial<Job>) => void;
    deleteJob: (id: number) => void;
};

export const useJobStore = create<JobStore>()(
    persist(
        (set) => ({
            jobs: [
                {
                    id: 1,
                    title: "Frontend Developer",
                    company: "FPT Software",
                    location: "Hà Nội",
                    experience: "Không yêu cầu",
                    salary: "8.000.000đ",
                    date: "2026-03-20",
                    type: "Full-time",
                    position: "Fresher",
                    status: "Pending",
                    description: "Yêu cầu tốt nghiệp chuyên nghành CNTT...",
                    skills: "HTML CSS NodeJS...",
                    contactName: "Phạm Hồng Sơn",
                    contactEmail: "sonph@fpt.com",
                    contactPhone: "0123456789"
                }
            ],
            addJob: (newJob) => set((state) => ({
                jobs: [{ ...newJob, id: Date.now() }, ...state.jobs]
            })),
            updateJob: (id, updatedJob) => set((state) => ({
                jobs: state.jobs.map(job => job.id === id ? { ...job, ...updatedJob } : job)
            })),
            deleteJob: (id) => set((state) => ({
                jobs: state.jobs.filter(job => job.id !== id)
            })),
        }),
        {
            name: "job-storage",
        }
    )
);