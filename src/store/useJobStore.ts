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
};

//Tạo kho chứa các thông tin

type JobStore = {
    jobs: Job[]; //Chứa danh sách các công việc
    addJob: (newJob: Omit<Job, 'id'>) => void;
};

export const useJobStore = create<JobStore>()(
    persist(
        (set) => 
        ({
            jobs: [
                {
                    id: 1,
                    title: "Frontend Developer",
                    company: "FPT Software",
                    location: "Hà Nội",
                    experience: "Không yêu cầu",
                    salary: "8.000.000đ",
                    date: "20/03/2026",
                    type: "Full-time",
                    position: "Fresher",
                    status: "Pending",
                    description: "Yêu cầu tốt nghiệp chuyên nghành CNTT...",
                    skills: "HTML CSS NodeJS..."
                }
            ],
            //Thêm job
            addJob: (newJob) => set((state) => ({
                jobs: [{ ...newJob, id: state.jobs.length + 1 }, ...state.jobs]
            })),
        }),
        {
            name: "job-storage",
        }
    )
);