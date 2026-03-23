import { useState } from "react";
import { FaGraduationCap } from "react-icons/fa";
import { EditableSection } from "../common/EditableSection";
import { useUserStore } from "../../../store/useUserStore";

export const EducationSection = () => {
    const { user, updateUser } = useUserStore();
    const [draft, setDraft] = useState({ ...user.education });

    const handleSave = () => updateUser({ education: draft });
    const handleCancel = () => setDraft({ ...user.education });

    const viewContent = (
        <div>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-4">
                <FaGraduationCap className="text-emerald-500" /> Học vấn
            </h3>
            {user.education.school ? (
                <div className="space-y-1">
                    <p className="font-bold text-slate-100">{user.education.school}</p>
                    <p className="text-emerald-400 text-sm">{user.education.major}</p>
                    <p className="text-slate-500 text-xs">{user.education.years} {user.education.GPA && `• GPA: ${user.education.GPA}`}</p>
                    {user.education.Courses && <p className="text-slate-400 text-sm mt-2">📚 {user.education.Courses}</p>}
                </div>
            ) : (
                <p className="italic text-slate-500 text-sm">Chưa có thông tin học vấn...</p>
            )}
        </div>
    );

    const editContent = (
        <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <FaGraduationCap className="text-emerald-500" /> Học vấn
            </h3>
            <input className="input-base" placeholder="Tên trường" value={draft.school} onChange={e => setDraft({...draft, school: e.target.value})}/>
            <div className="grid grid-cols-2 gap-3">
                <input className="input-base text-sm" placeholder="Chuyên ngành" value={draft.major} onChange={e => setDraft({...draft, major: e.target.value})}/>
                <input className="input-base text-sm" placeholder="Năm học (VD: 2020-2024)" value={draft.years} onChange={e => setDraft({...draft, years: e.target.value})}/>
                <input className="input-base text-sm" placeholder="GPA" value={draft.GPA} onChange={e => setDraft({...draft, GPA: e.target.value})}/>
                <input className="input-base text-sm" placeholder="Môn học nổi bật" value={draft.Courses} onChange={e => setDraft({...draft, Courses: e.target.value})}/>
            </div>
        </div>
    );

    return <EditableSection editContent={editContent} onSave={handleSave} onCancel={handleCancel}>{viewContent}</EditableSection>;
};
