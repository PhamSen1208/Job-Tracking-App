import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Project {
    id: string;
    name: string;
    description: string;
    link: string;
}

interface JobExperience {
    id: string;
    company: string;
    position: string;
    duration: string;
    description: string;
}

export interface UserProfile {
    firstName: string;
    lastName: string;
    avatar: string;
    headline: string;
    email: string;
    phone: string;
    link: string;
    location: string;
    careerGoal: string;
    education: {
        major: string;
        school: string;
        years: string;
        GPA: string;
        Courses: string;
    };
    skills: {
        hard: string[];
        soft: string[];
        foreignLanguage: string;
        certification: string;
    };
    experience: JobExperience[];
    projects: Project[];
}

interface UserStore {
    user: UserProfile;
    updateUser: (data: Partial<UserProfile>) => void;
    addExperience: (exp: Omit<JobExperience, 'id'>) => void;
    updateExperience: (id: string, exp: Partial<JobExperience>) => void;
    deleteExperience: (id: string) => void;
    addSkill: (type: 'hard' | 'soft', skill: string) => void;
    removeSkill: (type: 'hard' | 'soft', skill: string) => void;
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
                avatar: "",
                email: "",
                phone: "",
                link: "",
                headline:"",
                location: "",
                careerGoal: "",
                education: {
                    major: "",
                    school: "",
                    years: "",
                    GPA: "",
                    Courses: "",
                },
                skills: {
                    hard: [],
                    soft: [],
                    foreignLanguage: "",
                    certification: "",
                },
                experience: [],
                projects: [],
            },
            updateUser: (newData) => set((state) => {
                const updatedUser = { ...state.user, ...newData };
                // 2. Nếu có sửa education, mình phải merge tiếp lớp trong của education
                if (newData.education) {
                    updatedUser.education = { ...state.user.education, ...newData.education };
                }
                // 3. Tương tự cho skills (trừ phần mảng hard/soft đã có addSkill/removeSkill lo)
                if (newData.skills) {
                    updatedUser.skills = { ...state.user.skills, ...newData.skills };
                }

                return { user: updatedUser };
            }),

            addExperience: (exp) => set((state) => ({
                user: {
                    ...state.user,
                    experience: [...state.user.experience, { ...exp, id: Date.now().toString() }]
                }
            })),
            updateExperience: (id, updatedExp) => set((state) => ({
                user: {
                    ...state.user,
                    experience: state.user.experience.map(e => e.id === id ? { ...e, ...updatedExp } : e)
                }
            })),
            deleteExperience: (id) => set((state) => ({
                user: {
                    ...state.user,
                    experience: state.user.experience.filter(e => e.id !== id)
                }
            })),
            addSkill: (type, skill) => set((state) => ({
                user: {
                    ...state.user,
                    skills: {
                        ...state.user.skills,
                        [type]: [...state.user.skills[type], skill]
                    }
                }
            })),
            removeSkill: (type, skill) => set((state) => ({
                user: {
                    ...state.user,
                    skills: {
                        ...state.user.skills,
                        [type]: state.user.skills[type].filter(s => s !== skill)
                    }
                }
            })),
            addProject: (project) => set((state) => ({
                user: {
                    ...state.user,
                    projects: [...state.user.projects, { ...project, id: Date.now().toString() }]
                }
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
        merge: (persisted: any, current) => ({
            ...current,
            user: { ...current.user, ...persisted.user }
        }),
    }
    )
);