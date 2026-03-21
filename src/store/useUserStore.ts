import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Project {
    id: string;
    name: string;
    description: string;
    link: string;
}

interface UserProfile {
    firstName: string;
    lastName: string;
    role: string;
    email: string;
    phone: string;
    github: string;
    location: string;
    careerGoal: string;
    education: {
        major: string;
        school: string;
        years: string;
    };
    skills: {
        frontend: string;
        backend: string;
        database: string;
        others: string;
        foreignLanguage: string;
        certification: string;
    };
    experience: string;
    projects: Project[];
}

interface UserStore {
    user: UserProfile;
    updateUser: (data: Partial<UserProfile>) => void;
    addProject: (project: Omit<Project, 'id'>) => void;
    updateProject: (id: string, project: Partial<Project>) => void;
    deleteProject: (id: string) => void;
}

export const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            user: {
                firstName: "",
                lastName: "",
                role: "",
                email: "",
                phone: "",
                github: "",
                location: "",
                careerGoal: "",
                education: {
                    major: "",
                    school: "",
                    years: "",
                },
                skills: {
                    frontend: "",
                    backend: "",
                    database: "",
                    others: "",
                    foreignLanguage: "",
                    certification:"",
                },
                experience: "",
                projects: [],
            },
            updateUser: (newData) => set((state) => ({
                user: { ...state.user, ...newData }
            })),
            addProject: (project) => set((state) => ({
                user: { ...state.user, 
                projects: [...state.user.projects, { ...project, id: Date.now().toString() }] }
            })),
            updateProject: (id, updatedProject) => set((state) => ({
                user: {
                    ...state.user,
                    projects: state.user.projects.map(p => p.id === id ? { ...p, ...updatedProject } : p)
                }
            })),
            deleteProject: (id) => set((state) => ({
                user: { ...state.user, projects: state.user.projects.filter(p => p.id !== id) }
            })),
        }), {
            name: "user-storage",
        }
    )
);