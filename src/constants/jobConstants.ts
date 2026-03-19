export const JOB_STATUS = {
    Interview: "Interview",
    Pending: "Pending",
    Reject: "Reject",
} as const

export const JOB_TYPE = {
    FullTime: "Full-time",
    PartTime: "Part-time",
    Remote: "Remote",
} as const

export const JOB_POSITION = {
    Intern: "Intern",
    Fresher: "Fresher",
    Junior: "Junior",
    Middle: "Middle",
    Senior: "Senior",
    TechLead: "TechLead",
} as const

export type JobStatus = typeof JOB_STATUS[keyof typeof JOB_STATUS]
export type JobType = typeof JOB_TYPE[keyof typeof JOB_TYPE]
export type JobPosition = typeof JOB_POSITION[keyof typeof JOB_POSITION]

export const STATUS_COLORS: Record<JobStatus, string> = {
    Interview: "bg-blue-50 text-blue-700 border border-blue-200",     
    Pending: "bg-amber-50 text-amber-700 border border-amber-200",    
    Reject: "bg-red-50 text-red-700 border border-red-200",           
} as const

export const TYPE_COLORS: Record<JobType, string> = {
    "Full-time": "bg-slate-800 text-slate-200",
    "Part-time": "bg-slate-700 text-slate-300",
    "Remote": "bg-slate-700 text-slate-300",
} as const

export const POSITION_COLORS: Record<JobPosition, string> = {
    Intern: "bg-purple-700 text-purple-100",
    Fresher: "bg-yellow-700 text-yellow-100",
    Junior: "bg-orange-700 text-orange-100",
    Middle: "bg-green-700 text-green-100",
    Senior: "bg-blue-700 text-blue-100",
    TechLead: "bg-red-700 text-red-100",
} as const