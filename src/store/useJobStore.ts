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
                    title: "",
                    company: "",
                    location: "",
                    experience: "",
                    salary: "",
                    date: "",
                    type: "Full-time",
                    position: "Fresher",
                    status: "Pending",
                    description: "",
                    skills: "",
                    contactName: "",
                    contactEmail: "",
                    contactPhone: ""
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