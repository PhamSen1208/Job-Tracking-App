import type { Job } from "../components/jobs/JobCard";
import { useMemo } from "react";

export const useJobStats = (jobs: Job[]) => {
    return useMemo(() => ({
        pending: jobs.filter(j => j.status === "Pending").length,
        interview: jobs.filter(j => j.status === "Interview").length,
        reject: jobs.filter(j => j.status === "Reject").length,
        total: jobs.length,
    }), [jobs])
}