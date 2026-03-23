import React, { useState } from "react";
import { FaPen } from "react-icons/fa";

interface EditableSectionProps {
    children: React.ReactNode;
    editContent: React.ReactNode;
    onSave: () => void;
    onCancel: () => void;
}

export const EditableSection = ({children, editContent, onSave, onCancel}: EditableSectionProps) => {
    const [isEditing, setIsEditing] = useState(false);

    const handleSave = () => {
        onSave();
        setIsEditing(false);
    }
    const handleCancel = () => {
        onCancel?.();
        setIsEditing(false);
    }

    if(isEditing == true)
    {
        return(
            <div className="p-6 bg-slate-900/60 rounded-lg border border-emerald-500/30">
                {editContent}
                <div className="flex gap-2 mt-4">
                    <button 
                        onClick={handleSave}
                        className="px-4 py-1.5 bg-emerald-500 text-slate-950 font-medium rounded-lg text-sm">
                        Lưu
                    </button>
                    <button 
                        onClick={handleCancel}
                        className="px-4 py-1.5 bg-slate-800 text-slate-300 font-medium rounded-lg text-sm">
                        Hủy
                    </button>
                </div>
            </div>
        )
    }
    else
    {
        return (
            <div className=" relative group p-6 bg-slate-900/40 rounded-xl border border-slate-800 hover:border-slate-700">
                {children}
                {/*Icon bút chì chỉ hiện khi hover */}
                <button
                    onClick={() => setIsEditing(true)}
                    className="absolute top-4 right-4 p-2 bg-slate-800 text-slate-400 rounded-lg border border-slate-700 opacity-0 group-hover:opacity-100 hover:bg-slate-700 transition-opacity">
                    <FaPen size={12} className="text-emerald-400"/>
                </button>
            </div>
        )
    }
    
};