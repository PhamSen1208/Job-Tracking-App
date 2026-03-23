import { useState } from "react";
import { FaBullseye } from "react-icons/fa";
import { EditableSection } from "../common/EditableSection";
import { useProfileForm } from "../../../hooks/useProfileForm";

export const CareerGoalSection = () => {
    const {user, handleChange} = useProfileForm();
    const [draft, setDraft] = useState(user.careerGoal);

    const handleSave = () => {
        handleChange("careerGoal", draft);
    }

    const handleCancel = () => {
        setDraft(user.careerGoal);
    }

    //VIEW MODE
    const viewContent = (
        <div>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-3">
                <FaBullseye className="text-emerald-500" /> Mục tiêu nghề nghiệp
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                {user.careerGoal || <span className="italic text-slate-500">Chưa có mục tiêu nghề nghiệp...</span>}
            </p>
        </div>
    );
    //EDIT MODE
    const editContent = (
        <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <FaBullseye className="text-emerald-500" /> Mục tiêu nghề nghiệp
            </h3>
            <textarea 
                rows={5} 
                className="input-base text-sm"
                placeholder="Mô tả ngắn gọn..."
                value={draft}
                onChange={e => setDraft(e.target.value)}
            />
        </div>
    );

    return (
        <EditableSection
            editContent={editContent}
            onSave={handleSave}
            onCancel={handleCancel}
        >
            {viewContent}
        </EditableSection>
    );
}