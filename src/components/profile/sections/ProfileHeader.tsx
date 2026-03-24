import { useState } from "react";
import { FaUser, FaCamera, FaEnvelope, FaPhone, FaMapMarkerAlt, FaLink } from "react-icons/fa";
import { EditableSection } from "../common/EditableSection";
import { useProfileForm } from "../../../hooks/useProfileForm";
import { useUserStore } from "../../../store/useUserStore";


export const ProfileHeader = () => {
    const {user, handleChange, handleAvatarChange} = useProfileForm();
    //state nháp chỉ dùng trong edit mode, chưa commit vào store
    const [draft, setDraft] = useState({...user});

    const handleSave = () => {
        handleChange("firstName", draft.firstName);
        handleChange("lastName", draft.lastName);
        handleChange("headline", draft.headline);
        handleChange("email", draft.email);
        handleChange("phone", draft.phone);
        handleChange("location", draft.location);
        handleChange("link", draft.link);
    }

    const handleCancel = () => {
        //reset lại draft bằng user hiện tại
        setDraft({...useUserStore.getState().user});
    }

    //VIEW MODE 
    const viewContent = (
        <div className="flex items-center gap-6">
            {/*Avatar*/}
            <div className="w-20 h-20 rounded-full overflow-hidden bg-slate-800 border-2 border-slate-700 flex items-center justify-center shrink-0">
                {user.avatar ? (
                    <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                    <FaUser className="text-slate-500 text-3xl" />
                )}
            </div>
            {/*Info*/}
            <div className="flex-1">
                <h2 className="text-2xl font-bold text-slate-50">
                    {user.firstName || user.lastName ? `${user.firstName} ${user.lastName}` : "Chưa có tên"}
                </h2>
                <p className="text-emerald-400 font-medium mt-1">{user.headline || "Chưa có định hướng"}</p>

                {/* Contact info */}
                <div className="flex flex-wrap gap-10 mt-3">
                    {user.email && <span className="flex items-center gap-1.5 text-xs text-slate-400"><FaEnvelope/>{user.email}</span>}
                    {user.phone && <span className="flex items-center gap-1.5 text-xs text-slate-400"><FaPhone/>{user.phone}</span>}
                    {user.location && <span className="flex items-center gap-1.5 text-xs text-slate-400"><FaMapMarkerAlt/>{user.location}</span>}
                    {user.link && <a href={user.link} target="_blank" className="flex items-center gap-1.5 text-xs text-emerald-400 hover:underline"><FaLink/>{user.link}</a>}
                </div>
            </div>
        </div>
    );

    //EDIT MODE
    const editContent = (
        <div className="space-y-4">
            {/*Upload avatar*/}
            <div className="flex items-center gap-4">
                <div className="relative group">
                    <div className="w-20 h-20 rounded-full  overflow-hidden bg-slate-800 border-2 border-slate-700 flex items-center justify-center ">
                        {user.avatar ? <img src={user.avatar} alt="Avatar" 
                        className="w-full h-full object-cover" /> : 
                        <FaUser className="text-slate-600 text-2xl" />}
                    </div>
                    <label className="absolute inset-0 flex items-center justify-center bg-slate-950/60 opacity-0 group-hover:opacity-100 rounded-full cursor-pointer transition-opacity">
                        <FaCamera className="text-white"/>
                        <input type="file" className="hidden" accept="image/*" onChange={handleAvatarChange}/>
                    </label>
                </div>
                <span className="text-xs text-slate-500">Hover vào ảnh để thay đổi</span>
            </div>
            {/* Form fields (sửa draft, chưa lưu vào store) */}
            <div className="grid grid-cols-2 gap-4">
                <input 
                    className="input-base" 
                    placeholder="Tên" 
                    value={draft.firstName} 
                    onChange={e => setDraft({...draft, firstName: e.target.value})}
                />
                <input 
                    className="input-base" 
                    placeholder="Họ & đệm" 
                    value={draft.lastName} 
                    onChange={e => setDraft({...draft, lastName: e.target.value})}/>
            </div>

            <input 
                className="input-base" 
                placeholder="Định hướng nghề nghiệp (VD: Frontend Developer)" 
                value={draft.headline} onChange={e => setDraft({...draft, headline: e.target.value})}
            />

            <div className="grid grid-cols-2 gap-4">
                <input  
                    className="input-base" 
                    placeholder="Email" 
                    value={draft.email} onChange={e => setDraft({...draft, email: e.target.value})}/>
                <input 
                    className="input-base"
                    placeholder="Số điện thoại" 
                    value={draft.phone} 
                    onChange={e => setDraft({...draft, phone: e.target.value})}/>
                <input 
                    className="input-base"
                    placeholder="Thành phố"
                    value={draft.location} 
                    onChange={e => setDraft({...draft, location: e.target.value})}/>
                <input 
                    className="input-base"
                    placeholder="LinkedIn / Portfolio"
                    value={draft.link} 
                    onChange={e => setDraft({...draft, link: e.target.value})}
                />
            </div>
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
};
