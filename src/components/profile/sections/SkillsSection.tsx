import { useState } from "react";
import { FaTools, FaTimes, FaPlus } from "react-icons/fa";
import { useUserStore } from "../../../store/useUserStore";

export const SkillsSection = () => {
    const { user, addSkill, removeSkill, updateUser } = useUserStore();
    const [input, setInput] = useState({ hard: "", soft: "" });

    const handleAdd = (type: 'hard' | 'soft') => {
        const val = input[type].trim();
        if (!val || user.skills[type].includes(val)) return;
        addSkill(type, val);
        setInput(prev => ({ ...prev, [type]: "" }));
    };

    return (
        <div className="p-6 bg-slate-900/40 rounded-2xl border border-slate-800 space-y-6">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <FaTools className="text-emerald-500" /> Kỹ năng
            </h3>

            {/* HARD SKILLS */}
            <div className="space-y-2">
                <p className="text-xs font-bold text-blue-400 uppercase tracking-wider">Hard Skills</p>
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950/30 rounded-xl border border-slate-800 min-h-[48px]">
                    {user.skills.hard.map(skill => (
                        <span key={skill} className="flex items-center gap-1.5 px-2.5 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-lg text-xs font-medium">
                            {skill}
                            <button onClick={() => removeSkill('hard', skill)}><FaTimes size={9}/></button>
                        </span>
                    ))}
                    <div className="flex items-center gap-1 flex-1 min-w-[120px]">
                        <input
                            className="bg-transparent outline-none text-xs text-slate-300 w-full placeholder:text-slate-600"
                            placeholder="Thêm (Enter)"
                            value={input.hard}
                            onChange={e => setInput({...input, hard: e.target.value})}
                            onKeyDown={e => e.key === 'Enter' && handleAdd('hard')}
                        />
                        <button onClick={() => handleAdd('hard')} className="p-1 bg-slate-800 rounded text-slate-400 hover:bg-slate-700"><FaPlus size={9}/></button>
                    </div>
                </div>
            </div>

            {/* SOFT SKILLS */}
            <div className="space-y-2">
                <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Soft Skills</p>
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950/30 rounded-xl border border-slate-800 min-h-[48px]">
                    {user.skills.soft.map(skill => (
                        <span key={skill} className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg text-xs font-medium">
                            {skill}
                            <button onClick={() => removeSkill('soft', skill)}><FaTimes size={9}/></button>
                        </span>
                    ))}
                    <div className="flex items-center gap-1 flex-1 min-w-[120px]">
                        <input
                            className="bg-transparent outline-none text-xs text-slate-300 w-full placeholder:text-slate-600"
                            placeholder="Thêm (Enter)"
                            value={input.soft}
                            onChange={e => setInput({...input, soft: e.target.value})}
                            onKeyDown={e => e.key === 'Enter' && handleAdd('soft')}
                        />
                        <button onClick={() => handleAdd('soft')} className="p-1 bg-slate-800 rounded text-slate-400 hover:bg-slate-700"><FaPlus size={9}/></button>
                    </div>
                </div>
            </div>

            {/* NGOẠI NGỮ & CHỨNG CHỈ */}
            <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="space-y-1.5">
                    <label className="text-xs text-slate-500 uppercase font-bold">Ngoại ngữ</label>
                    <input className="input-base text-sm" placeholder="VD: Tiếng Anh B2..." value={user.skills.foreignLanguage} onChange={e => updateUser({ skills: { ...user.skills, foreignLanguage: e.target.value } })}/>
                </div>
                <div className="space-y-1.5">
                    <label className="text-xs text-slate-500 uppercase font-bold">Chứng chỉ</label>
                    <input className="input-base text-sm" placeholder="VD: Google Analytics..." value={user.skills.certification} onChange={e => updateUser({ skills: { ...user.skills, certification: e.target.value } })}/>
                </div>
            </div>
        </div>
    );
};
