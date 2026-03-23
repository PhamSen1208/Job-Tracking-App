import { useState } from "react";
import { FaBriefcase, FaPlus, FaTrash, FaPen } from "react-icons/fa";
import { useUserStore } from "../../../store/useUserStore";

// Định nghĩa kiểu cho form (giống JobExperience nhưng id có thể rỗng)
const EMPTY_FORM = { id: "", company: "", position: "", duration: "", description: "" };

export const ExperienceSection = () => {
    const { user, addExperience, updateExperience, deleteExperience } = useUserStore();

    // Form state - id rỗng = thêm mới, id có = đang sửa
    const [expForm, setExpForm] = useState(EMPTY_FORM);
    const [showForm, setShowForm] = useState(false);

    const isEditing = expForm.id !== "";

    const handleOpenAdd = () => {
        setExpForm(EMPTY_FORM); // form trống để thêm mới
        setShowForm(true);
    };

    const handleOpenEdit = (exp: typeof EMPTY_FORM) => {
        setExpForm(exp);        // load dữ liệu item vào form
        setShowForm(true);
    };

    const handleSave = () => {
        if (!expForm.company || !expForm.position) return; // validation đơn giản

        if (isEditing) {
            updateExperience(expForm.id, expForm);
        } else {
            addExperience(expForm);
        }
        setExpForm(EMPTY_FORM);
        setShowForm(false);
    };

    const handleCancel = () => {
        setExpForm(EMPTY_FORM);
        setShowForm(false);
    };

    return (
        <div className="p-6 bg-slate-900/40 rounded-2xl border border-slate-800">
            {/* HEADER */}
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <FaBriefcase className="text-emerald-500" /> Kinh nghiệm làm việc
                </h3>
                {!showForm && (
                    <button onClick={handleOpenAdd} className="flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-medium">
                        <FaPlus size={10}/> Thêm
                    </button>
                )}
            </div>

            {/* FORM - chỉ hiện khi showForm = true */}
            {showForm && (
                <div className="mb-6 p-4 bg-slate-950/50 rounded-xl border border-dashed border-slate-700 space-y-3">
                    <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                        {isEditing ? "Chỉnh sửa kinh nghiệm" : "Thêm kinh nghiệm mới"}
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                        <input className="input-base text-sm" placeholder="Tên công ty" value={expForm.company} onChange={e => setExpForm({...expForm, company: e.target.value})}/>
                        <input className="input-base text-sm" placeholder="Vị trí" value={expForm.position} onChange={e => setExpForm({...expForm, position: e.target.value})}/>
                    </div>
                    <input className="input-base text-sm" placeholder="Thời gian (VD: 01/2023 - Hiện tại)" value={expForm.duration} onChange={e => setExpForm({...expForm, duration: e.target.value})}/>
                    <textarea rows={3} className="input-base text-sm" placeholder="Mô tả công việc..." value={expForm.description} onChange={e => setExpForm({...expForm, description: e.target.value})}/>
                    <div className="flex gap-2">
                        <button onClick={handleSave} className="px-4 py-1.5 bg-emerald-500 text-slate-950 font-bold rounded-lg text-sm">Lưu</button>
                        <button onClick={handleCancel} className="px-4 py-1.5 bg-slate-800 text-slate-300 rounded-lg text-sm">Hủy</button>
                    </div>
                </div>
            )}

            {/* DANH SÁCH */}
            <div className="space-y-4">
                {(user.experience ?? []).map(exp => (
                    <div key={exp.id} className="group p-4 bg-slate-900/60 rounded-xl border border-slate-800 hover:border-slate-700 transition-all">
                        <div className="flex justify-between items-start">
                            <div>
                                <h4 className="font-bold text-slate-100">{exp.position}</h4>
                                <p className="text-emerald-400 text-sm font-medium">{exp.company}</p>
                                <p className="text-slate-500 text-xs mt-0.5 uppercase tracking-wider">{exp.duration}</p>
                            </div>
                            {/* Nút chỉ hiện khi hover */}
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => handleOpenEdit(exp)} className="p-1.5 text-slate-500 hover:text-emerald-400"><FaPen size={11}/></button>
                                <button onClick={() => deleteExperience(exp.id)} className="p-1.5 text-slate-500 hover:text-red-500"><FaTrash size={11}/></button>
                            </div>
                        </div>
                        {exp.description && (
                            <p className="mt-3 text-sm text-slate-400 whitespace-pre-line leading-relaxed">{exp.description}</p>
                        )}
                    </div>
                ))}
                {user.experience.length === 0 && !showForm && (
                    <p className="text-center py-8 text-slate-500 italic text-sm">Chưa có kinh nghiệm. <button onClick={handleOpenAdd} className="text-emerald-400 hover:underline">Thêm ngay</button></p>
                )}
            </div>
        </div>
    );
};
