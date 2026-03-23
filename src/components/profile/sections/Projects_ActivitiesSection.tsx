import { useState } from "react";
import { FaProjectDiagram, FaPlus, FaTrash, FaPen, FaLink } from "react-icons/fa";
import { useUserStore } from "../../../store/useUserStore";

const EMPTY_FORM = { id: "", name: "", description: "", link: "" };

export const ProjectsSection = () => {
    const { user, addProject, updateProject, deleteProject } = useUserStore();
    const [projForm, setProjForm] = useState(EMPTY_FORM);
    const [showForm, setShowForm] = useState(false);
    const isEditing = projForm.id !== "";

    const handleOpenAdd = () => { setProjForm(EMPTY_FORM); setShowForm(true); };
    const handleOpenEdit = (proj: typeof EMPTY_FORM) => { setProjForm(proj); setShowForm(true); };
    const handleCancel = () => { setProjForm(EMPTY_FORM); setShowForm(false); };

    const handleSave = () => {
        if (!projForm.name) return;
        isEditing ? updateProject(projForm.id, projForm) : addProject(projForm);
        setProjForm(EMPTY_FORM);
        setShowForm(false);
    };

    return (
        <div className="p-6 bg-slate-900/40 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <FaProjectDiagram className="text-emerald-500" /> Dự án / Hoạt động
                </h3>
                {!showForm && <button onClick={handleOpenAdd} className="flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-medium"><FaPlus size={10}/>Thêm</button>}
            </div>

            {showForm && (
                <div className="mb-6 p-4 bg-slate-950/50 rounded-xl border border-dashed border-slate-700 space-y-3">
                    <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest">{isEditing ? "Chỉnh sửa dự án" : "Thêm dự án mới"}</p>
                    <input className="input-base" placeholder="Tên dự án" value={projForm.name} onChange={e => setProjForm({...projForm, name: e.target.value})}/>
                    <input className="input-base text-sm" placeholder="Link (GitHub, Demo...)" value={projForm.link} onChange={e => setProjForm({...projForm, link: e.target.value})}/>
                    <textarea rows={3} className="input-base text-sm" placeholder="Mô tả dự án..." value={projForm.description} onChange={e => setProjForm({...projForm, description: e.target.value})}/>
                    <div className="flex gap-2">
                        <button onClick={handleSave} className="px-4 py-1.5 bg-emerald-500 text-slate-950 font-bold rounded-lg text-sm">Lưu</button>
                        <button onClick={handleCancel} className="px-4 py-1.5 bg-slate-800 text-slate-300 rounded-lg text-sm">Hủy</button>
                    </div>
                </div>
            )}

            <div className="space-y-4">
                {user.projects.map(proj => (
                    <div key={proj.id} className="group p-4 bg-slate-900/60 rounded-xl border border-slate-800 hover:border-slate-700 transition-all">
                        <div className="flex justify-between items-start">
                            <div>
                                <h4 className="font-bold text-slate-100">{proj.name}</h4>
                                {proj.link && <a href={proj.link} target="_blank" className="flex items-center gap-1 text-xs text-emerald-400 hover:underline mt-0.5"><FaLink size={9}/>{proj.link}</a>}
                            </div>
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => handleOpenEdit(proj)} className="p-1.5 text-slate-500 hover:text-emerald-400"><FaPen size={11}/></button>
                                <button onClick={() => deleteProject(proj.id)} className="p-1.5 text-slate-500 hover:text-red-500"><FaTrash size={11}/></button>
                            </div>
                        </div>
                        {proj.description && <p className="mt-2 text-sm text-slate-400">{proj.description}</p>}
                    </div>
                ))}
                {user.projects.length === 0 && !showForm && (
                    <p className="text-center py-8 text-slate-500 italic text-sm">Chưa có dự án. <button onClick={handleOpenAdd} className="text-emerald-400 hover:underline">Thêm ngay</button></p>
                )}
            </div>
        </div>
    );
};
