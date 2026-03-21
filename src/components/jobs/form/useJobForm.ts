import type { JobPosition, JobStatus, JobType } from "../../../constants/jobConstants";

export type JobFormState = {
  title: string;
  company: string;
  location:string;
  experience:string;
  salary:string;
  date:string;
  type:JobType;
  position:JobPosition;
  status:JobStatus;
  description:string;
  skills: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
};

export const INITIAL_JOB_FORM: JobFormState = {
  title: "",
  company: "",
  location:"",
  experience:"",
  salary:"",
  date:"",
  type:"Full-time",
  position:"Intern",
  status:"Pending",
  description:"",
  skills: "",
  contactName: "",
  contactEmail: "",
  contactPhone: ""
};

