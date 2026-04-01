import type { Job } from "../components/jobs/JobCard";
import { useState, useCallback, useEffect } from "react"
import { useAuth } from "../context/AuthContext";

// Quản lý joblist

export const useJobs = () => {
    const {token} = useAuth();
    const [jobs, setJobs] = useState<Job[]>([]);
    const [isError, setIsError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const API_URL = import.meta.env.PROD ? "" : "http://localhost:5118";


    //Lấy danh sách công việc
    const fetchJobs = useCallback(async () => {
        setIsLoading(true);
        setIsError(null);

        try {
             const response = await fetch(`${API_URL}/api/jobs`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
             });

             if(!response.ok)
             {
                throw Error("Không thể tải danh sách công việc");
             }

             const data = await response.json();
             setJobs(data);
        } catch (error) {
            setIsError(error instanceof Error ? error.message: "Lỗi tải Job");
        }
        finally
        {
            setIsLoading(false);
        }
    },[token]);

    useEffect(() => {
        fetchJobs();
    }, [fetchJobs]);

    //Thêm công việc
    const addJob = useCallback(async (newJob: Omit<Job, 'id'>) => {
        try
        {
            const response = await fetch(`${API_URL}/api/jobs`, {
                method: "POST",
                headers: {
                 "Content-Type" : "application/json",
                 "Authorization" : `Bearer ${token}`  
                },
                body: JSON.stringify(newJob)
            });
            if(!response.ok)
            {
                throw new Error("Không thể thêm công việc");
            }

            const savedJob = await response.json();
            setJobs(prev => [savedJob,...prev]);
        }
        catch(error)
        {
            setIsError(error instanceof Error ? error.message: "Lỗi thêm Job");
            throw error;
        }
        
    }, [token]);

    //Cập nhật công việc
    const updateJob = useCallback(async (jobId: number, updates: Partial<Job>) => {
        try {
            const response = await fetch(`${API_URL}/api/jobs/${jobId}`, {
                method: "PUT",
                headers: {
                    "Content-Type" : "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({...updates, id: jobId})
            });

            if(!response.ok)
            {
                throw new Error("Không thể cập nhật công việc");
            }
            //Cập nhật lại state jobs
            setJobs(prev => prev.map((job) => job.id === jobId ? {...job,...updates}: job));
        } catch (error) {
            setIsError(error instanceof Error ? error.message: "Lỗi cập nhật Job");
            throw error;
        }
    }, [token])

    //Xóa công việ
    const deleteJob = useCallback(async (jobId: number) => {
        try {
            const response = await fetch(`${API_URL}/api/jobs/${jobId}`, {
                method: "DELETE",
                headers: {
                    "Authorization" : `Bearer ${token}`
                },
            });
            if(!response.ok)
            {
                throw new Error("Không thể xóa công việc");
            }
            setJobs(prev => prev.filter((job) => job.id !== jobId));
        } catch (error) {
            setIsError(error instanceof Error ? error.message: "Lỗi xóa Job");
            throw error;
        }
    }, [token])

    return { jobs, isLoading,  isError,fetchJobs, addJob, updateJob, deleteJob }
}