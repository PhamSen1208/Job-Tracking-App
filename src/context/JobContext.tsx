import type { Job, JobHistory } from "../components/jobs/JobCard";
import { useState, useCallback, useEffect, createContext, useContext } from "react"
import type { ReactNode } from "react"
import { useAuth } from "./AuthContext";

type JobContextType = {
    jobs: Job[];
    isLoading: boolean;
    isError: string | null;
    fetchJobs: () => Promise<void>;
    fetchJob: (jobId: number) => Promise<Job | undefined>;
    addJob: (newJob: Omit<Job, 'id'>) => Promise<void>;
    updateJob: (jobId: number, updates: Partial<Job>) => Promise<void>;
    deleteJob: (jobId: number) => Promise<void>;
    fetchJobHistories: (jobId: number) => Promise<JobHistory[] | undefined>;
};

const JobContext = createContext<JobContextType | undefined>(undefined);

// ADAPTER: Chuyển đổi dữ liệu từ Backend C# (Job) sang Frontend UI (JobCard)
const mapToFrontendJob = (apiJob: any): Job => {
    let frontendStatus = apiJob.status;
    if (frontendStatus === 'Rejected') frontendStatus = 'Reject';
    if (frontendStatus === 'Interviewing') frontendStatus = 'Interview';

    let frontendType = apiJob.type;
    if (frontendType === 'FullTime') frontendType = 'Full-time';
    if (frontendType === 'PartTime') frontendType = 'Part-time';

    return {
        id: apiJob.id,
        title: apiJob.jobTitle,
        company: apiJob.company,
        location: apiJob.location || "",
        salary: apiJob.salary || "",
        experience: apiJob.experience || "",
        skills: apiJob.skills || "",
        date: apiJob.appliedDate,
        status: frontendStatus,
        position: apiJob.position === 'TechLead' ? 'Senior' : apiJob.position,
        type: frontendType,
        contactName: apiJob.contactName || "",
        contactEmail: apiJob.contactEmail || "",
        contactPhone: apiJob.contactPhone || "",
        description: apiJob.description || ""
    };
};

// ADAPTER: Chuyển đổi dữ liệu từ Frontend UI (Omit<Job, 'id'>) sang Backend C# (CreateJobDto)
const mapToApiDto = (feJob: any) => {
    let apiStatus = feJob.status;
    if (apiStatus === 'Reject') apiStatus = 'Rejected';
    if (apiStatus === 'Interview') apiStatus = 'Interviewing';

    let apiType = feJob.type;
    if (apiType === 'Full-time') apiType = 'FullTime';
    if (apiType === 'Part-time') apiType = 'PartTime';

    let apiPos = feJob.position;
    if (apiPos === 'TechLead') apiPos = 'Senior'; 

    return {
        jobTitle: feJob.title,
        company: feJob.company,
        location: feJob.location,
        salary: feJob.salary,
        experience: feJob.experience,
        skills: feJob.skills,
        status: apiStatus,
        position: apiPos,
        type: apiType,
        contact: {
            name: feJob.contactName,
            email: feJob.contactEmail,
            phone: feJob.contactPhone
        },
        description: feJob.description
    };
};

export const JobProvider = ({ children }: { children: ReactNode }) => {
    const { token, isAuthenticated } = useAuth();
    const [jobs, setJobs] = useState<Job[]>([]);
    const [isError, setIsError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const API_URL = import.meta.env.PROD ? "" : "http://localhost:5118";

    const fetchJobs = useCallback(async () => {
        if (!token) return;
        setIsLoading(true);
        setIsError(null);

        try {
            const response = await fetch(`${API_URL}/api/jobs`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            if (!response.ok) throw Error("Không thể tải danh sách công việc");
            const data = await response.json();
            setJobs(data.map(mapToFrontendJob)); // Map to Frontend Format
        } catch (error) {
            setIsError(error instanceof Error ? error.message : "Lỗi tải Job");
        } finally {
            setIsLoading(false);
        }
    }, [token, API_URL]);

    useEffect(() => {
        if (isAuthenticated && token) fetchJobs();
        else setJobs([]);
    }, [isAuthenticated, token, fetchJobs]);

    const fetchJob = useCallback(async (JobId: number) => {
        setIsLoading(true);
        setIsError(null);
        try {
            const response = await fetch(`${API_URL}/api/jobs/${JobId}`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (!response.ok) throw new Error("Không thể tải chi tiết công việc");
            const data = await response.json();
            return mapToFrontendJob(data); // Map to Frontend Format
        } catch (error) {
            setIsError(error instanceof Error ? error.message : "Lỗi tải job")
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, [token, API_URL]);

    const addJob = useCallback(async (newJob: Omit<Job, 'id'>) => {
        try {
            const dto = mapToApiDto(newJob); // Map to Backend DTO
            const response = await fetch(`${API_URL}/api/jobs`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(dto)
            });
            if (!response.ok) {
                const errText = await response.text();
                console.error("Lỗi từ C# Backend:", errText);
                throw new Error("Không thể thêm công việc");
            }
            const savedJob = await response.json();
            setJobs(prev => [mapToFrontendJob(savedJob), ...prev]);
        } catch (error) {
            setIsError(error instanceof Error ? error.message : "Lỗi thêm Job");
            throw error;
        }
    }, [token, API_URL]);

    const updateJob = useCallback(async (jobId: number, updates: Partial<Job>) => {
        try {
            const dto = mapToApiDto(updates); // Map updates to Backend DTO
            const response = await fetch(`${API_URL}/api/jobs/${jobId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(dto)
            });
            if (!response.ok) throw new Error("Không thể cập nhật công việc");
            
            // Cập nhật lại list ở UI (Bảo toàn dữ liệu đã map)
            setJobs(prev => prev.map((job) => job.id === jobId ? { ...job, ...updates } : job));
        } catch (error) {
            setIsError(error instanceof Error ? error.message : "Lỗi cập nhật Job");
            throw error;
        }
    }, [token, API_URL]);

    const deleteJob = useCallback(async (jobId: number) => {
        try {
            const response = await fetch(`${API_URL}/api/jobs/${jobId}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` },
            });
            if (!response.ok) throw new Error("Không thể xóa công việc");
            setJobs(prev => prev.filter((job) => job.id !== jobId));
        } catch (error) {
            setIsError(error instanceof Error ? error.message : "Lỗi xóa Job");
            throw error;
        }
    }, [token, API_URL]);

    const fetchJobHistories = useCallback(async (JobId: number) => {
        setIsLoading(true);
        setIsError(null);
        try {
            const response = await fetch(`${API_URL}/api/jobs/${JobId}/history`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (!response.ok) throw new Error("Không thể tải lịch sử thay đổi");
            
            // Lịch sử không cần map phức tạp, có thể trả luôn
            return await response.json() as JobHistory[]; 
        } catch (error) {
            setIsError(error instanceof Error ? error.message : "Lỗi tải lịch sử Job");
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, [token, API_URL]);

    return (
        <JobContext.Provider value={{ jobs, isLoading, isError, fetchJob, fetchJobs, addJob, updateJob, deleteJob, fetchJobHistories }}>
            {children}
        </JobContext.Provider>
    );
};

export const useJobs = () => {
    const context = useContext(JobContext);
    if (!context) throw new Error("useJobs phải được sử dụng trong JobProvider");
    return context;
};
