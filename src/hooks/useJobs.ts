import type { Job } from "../components/jobs/JobCard";
import { useState, useCallback, useEffect } from "react"

// Quản lý joblist

export const useJobs = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [isError, setIsError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchJobs = useCallback(async () => {
        setIsLoading(true);
        setIsError(null);

        try {
             // const response = await fetch('/api/jobs')
            // const data = await response.json()
            // setJobs(data)
            
            // Mock data for now
            const mockJobs: Job[] = [
                {
                    id: 1,
                    title: "Frontend Developer",
                    company: "Công ty A",
                    location: "Hà Nội",
                    experience: "2+ năm",
                    salary: "20-25M",
                    date: "2024-01-15",
                    type: "Full-time",
                    position: "Junior",
                    status: "Interview",
                },
                {
                    id: 2,
                    title: "Backend Developer",
                    company: "Công ty B",
                    location: "Hà Nội",
                    experience: "1+ năm",
                    salary: "20-25M",
                    date: "2024-01-15",
                    type: "Full-time",
                    position: "Junior",
                    status: "Interview",
                },
                {
                    id: 3,
                    title: "FullStack Developer",
                    company: "Công ty C",
                    location: "Hà Nội",
                    experience: "không kinh nghiệm",
                    salary: "10-15M",
                    date: "2024-01-15",
                    type: "Full-time",
                    position: "Fresher",
                    status: "Interview",
                },
                {
                    id: 4,
                    title: "Frontend Developer",
                    company: "Công ty A",
                    location: "Hà Nội",
                    experience: "2+ năm",
                    salary: "20-25M",
                    date: "2024-01-15",
                    type: "Full-time",
                    position: "Junior",
                    status: "Interview",
                },
            ]
            setJobs(mockJobs);
        } catch (error) {
            setIsError(error instanceof Error ? error.message: "Lỗi tải Job");
        }
        finally
        {
            setIsLoading(false);
        }
    },[]);

    useEffect(() => {
        fetchJobs();
    }, [fetchJobs]);

    const addJob = useCallback((newJob: Job) => {
        setJobs(prev => [newJob, ...prev])
    }, [])

    const updateJob = useCallback((jobId: number, updates: Partial<Job>) => {
        setJobs(prev => prev.map(job =>
            job.id === jobId ? { ...job, ...updates } : job
        ))
    }, [])

    const deleteJob = useCallback((jobId: number) => {
        setJobs(prev => prev.filter(job => job.id !== jobId))
    }, [])

    return { jobs, isLoading,  isError,fetchJobs, addJob, updateJob, deleteJob }
}