import { useUserStore } from "../store/useUserStore";
import { useState } from "react";
import { toast } from "react-toastify";
import { FaUser, FaGraduationCap, FaTools, FaProjectDiagram, FaBriefcase, FaSave, FaTrash } from "react-icons/fa";

const Profile = () => {
    const { user, updateUser, addProject,updateProject, deleteProject } = useUserStore();
    const [activeTab, setActiveTab] = useState("general");
    const [formData, setFormData] = useState(user);
    const [isSubmit, setIsSubmit] = useState(false);

    // Quản lý trạng thái dự án
    const [projectForm, setProjectForm] = useState({ id: "", name: "", description: "", link: "" });
    const isAddingProject = !projectForm.id;

    const handleSaveProject = () => {
        if (!projectForm.name) {
            toast.error("Vui lòng nhập tên dự án");
            return;
        }

        if (projectForm.id) {
            updateProject(projectForm.id, projectForm);
            toast.success("Cập nhật dự án thành công");
        } else {
            addProject(projectForm);
            toast.success("Thêm dự án thành công");
        }

        // Reset form
        setProjectForm({ id: "", name: "", description: "", link: "" });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmit(true);
        await new Promise((resolve) => setTimeout(resolve, 800));
        updateUser(formData);
        setIsSubmit(false);
        toast.success("Cập nhật hồ sơ thành công! ✨");
    }

    const tabs = [
        { id: "general", label: "Thông tin chung", icon: FaUser },
        { id: "education", label: "Học vấn & KN", icon: FaGraduationCap },
        { id: "skills", label: "Kỹ năng", icon: FaTools },
        { id: "projects", label: "Dự án", icon: FaProjectDiagram },
    ];

    return (
        <div className="max-w-5xl mx-auto pb-20">
            <header className="mb-10 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-slate-50 tracking-tight">Hồ sơ cá nhân</h1>
                    <p className="text-slate-400 mt-2 text-sm">Quản lý các thông tin kỹ năng và dự án</p>
                </div>
                <button 
                  onClick={handleSubmit}
                  disabled={isSubmit}
                  className="flex items-center gap-2 px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-xl transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50"
                >
                  <FaSave /> {isSubmit ? "Đang lưu..." : "Lưu tất cả"}
                </button>
            </header>

            <div className="flex flex-col md:flex-row gap-8">
                {/* SIDEBAR TABS */}
                <aside className="md:w-64 space-y-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium  ${
                                activeTab === tab.id 
                                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-lg shadow-emerald-500/5" 
                                : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                            }`}
                        >
                            <tab.icon className={activeTab === tab.id ? "text-emerald-400" : "text-slate-500"} />
                            {tab.label}
                        </button>
                    ))}
                </aside>

                {/* CONTENT AREA */}
                <main className="flex-1 bg-slate-900/40 border border-slate-800 p-8 rounded-3xl shadow-2xl">
                    {activeTab === "general" && (
                        <div className="space-y-6 animate-in fade-in duration-500">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tên</label>
                                    <input className="input-base" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Họ & Tên đệm</label>
                                    <input className="input-base" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Vị trí công việc (Role)</label>
                                    <input className="input-base" value={formData.role ?? ''} onChange={(e) => setFormData({...formData, role: e.target.value})} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email</label>
                                    <input className="input-base" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Số điện thoại</label>
                                    <input className="input-base" value={formData.phone ?? ''} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Github (IT)</label>
                                    <input className="input-base" value={formData.github ?? ''} onChange={(e) => setFormData({...formData, github: e.target.value})} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Địa điểm</label>
                                    <input className="input-base" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Mục tiêu nghề nghiệp</label>
                                <textarea rows={4} className="input-base" value={formData.careerGoal ?? ''} onChange={(e) => setFormData({...formData, careerGoal: e.target.value})} />
                            </div>
                        </div>
                    )}

                    {activeTab === "education" && (
                        <div className="space-y-10 animate-in fade-in duration-500">
                           <section>
                                <h3 className="text-lg font-bold text-slate-200 mb-6 flex items-center gap-2">
                                    <FaGraduationCap className="text-emerald-500" /> Học vấn
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Chuyên ngành</label>
                                        <input className="input-base" value={formData.education.major} onChange={(e) => setFormData({...formData, education: {...formData.education, major: e.target.value}})} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Thời gian</label>
                                        <input className="input-base" value={formData.education.years} onChange={(e) => setFormData({...formData, education: {...formData.education, years: e.target.value}})} />
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tên trường</label>
                                        <input className="input-base" value={formData.education.school} onChange={(e) => setFormData({...formData, education: {...formData.education, school: e.target.value}})} />
                                    </div>
                                </div>
                           </section>
                           <section>
                                <h3 className="text-lg font-bold text-slate-200 mb-6 flex items-center gap-2">
                                    <FaBriefcase className="text-emerald-500" /> Kinh nghiệm làm việc
                                </h3>
                                <textarea rows={5} className="input-base" value={formData.experience} onChange={(e) => setFormData({...formData, experience: e.target.value})} />
                           </section>
                        </div>
                    )}

                    {activeTab === "skills" && (
                        <div className="space-y-6 animate-in fade-in duration-500">
                             <div className="grid grid-cols-1 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Frontend</label>
                                    <input className="input-base" value={formData.skills.frontend} onChange={(e) => setFormData({...formData, skills: {...formData.skills, frontend: e.target.value}})} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Backend</label>
                                    <input className="input-base" value={formData.skills.backend} onChange={(e) => setFormData({...formData, skills: {...formData.skills, backend: e.target.value}})} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Database</label>
                                    <input className="input-base" value={formData.skills.database} onChange={(e) => setFormData({...formData, skills: {...formData.skills, database: e.target.value}})} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Khác</label>
                                    <input className="input-base" value={formData.skills.others} onChange={(e) => setFormData({...formData, skills: {...formData.skills, others: e.target.value}})} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Ngoại ngữ</label>
                                    <input className="input-base" value={formData.skills.foreignLanguage} onChange={(e) => setFormData({...formData, skills: {...formData.skills, foreignLanguage: e.target.value}})} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Chứng chỉ</label>
                                    <input className="input-base" value={formData.skills.certification} onChange={(e) => setFormData({...formData, skills: {...formData.skills, certification: e.target.value}})} />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "projects" && (
                        <div className="space-y-8 animate-in fade-in duration-500">
                            {/* PROJECT FORM (Chỉ hiện khi thêm/sửa) */}
                            <div className="bg-slate-950/30 p-6 rounded-2xl border border-dashed border-slate-700">
                                <h4 className="text-sm font-bold text-emerald-400 mb-4 uppercase">
                                    {isAddingProject ? "Thêm dự án mới" : "Thông tin dự án"}
                                </h4>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-slate-500 uppercase">Tên dự án</label>
                                        <input 
                                            className="input-base" 
                                            placeholder="VD: App quản lý sách..." 
                                            value={projectForm.name}
                                            onChange={(e) => setProjectForm({...projectForm, name: e.target.value})}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-slate-500 uppercase">Đường dẫn (Link/Github)</label>
                                        <input 
                                            className="input-base" 
                                            placeholder="https://github.com/..." 
                                            value={projectForm.link}
                                            onChange={(e) => setProjectForm({...projectForm, link: e.target.value})}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-slate-500 uppercase">Mô tả ngắn</label>
                                        <textarea 
                                            rows={3} 
                                            className="input-base text-sm" 
                                            placeholder="Mô tả công nghệ sử dụng và tính năng chính..." 
                                            value={projectForm.description}
                                            onChange={(e) => setProjectForm({...projectForm, description: e.target.value})}
                                        />
                                    </div>
                                    <button 
                                        onClick={handleSaveProject}
                                        className="w-full py-2 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 font-bold rounded-lg transition-all border border-emerald-500/20"
                                    >
                                        {projectForm.id ? "Cập nhật dự án" : "Thêm vào danh sách"}
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Danh sách dự án của bạn ({user.projects.length})</h3>
                                <div className="grid grid-cols-1 gap-4">
                                    {user.projects.map((proj) => (
                                        <div key={proj.id} className="p-5 bg-slate-900/60 rounded-2xl border border-slate-800 group transition-all hover:border-slate-700">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h4 className="font-bold text-slate-200">{proj.name}</h4>
                                                    <a href={proj.link} target="_blank" rel="noreferrer" className="text-[10px] text-emerald-500 hover:underline">{proj.link}</a>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button 
                                                        onClick={() => setProjectForm(proj)}
                                                        className="p-2 text-slate-500 hover:text-blue-400 transition-colors"
                                                    >
                                                        Sửa
                                                    </button>
                                                    <button 
                                                        onClick={() => deleteProject(proj.id)}
                                                        className="p-2 text-slate-500 hover:text-red-500 transition-colors"
                                                    >
                                                        <FaTrash size={12} />
                                                    </button>
                                                </div>
                                            </div>
                                            <p className="text-sm text-slate-400 mt-2">{proj.description}</p>
                                        </div>
                                    ))}
                                    {user.projects.length === 0 && (
                                        <p className="text-center py-10 text-slate-500 italic text-sm">Chưa có dự án nào. Hãy thêm dự án đầu tiên của bạn!</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

export default Profile;

