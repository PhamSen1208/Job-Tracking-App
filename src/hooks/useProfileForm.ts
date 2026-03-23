import { useUserStore } from "../store/useUserStore";
import { useState } from "react";
import {toast} from "react-toastify";

export const useProfileForm = () => {

    const {user, updateUser} = useUserStore();
    const [isSubmit, setIsSubmit] = useState(false);

    // Xử lý thay đổi ảnh đại diện
    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        //Kiểm tra file có tồn tại không
        const file = e.target.files?.[0];
        const MAX_SIZE = 1 * 1024 * 1024;
        if(!file) return;

        //Kiểm tra xem có đúng dạng png, jpg...
        const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/gif", "image/webp"];
        if(!validTypes.includes(file.type))
        {
            toast.error("Ảnh không đúng định dạng.");
            return;
        }
        //Kiểm tra dung lượng
        if(file.size > MAX_SIZE)
        {
            toast.error("Ảnh không được vượt quá 1MB.");
            return;
        }
        //Đọc file và chueyenr sang base 64
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64 = reader.result as string;
            updateUser({avatar: base64});
            toast.success("Đã cập nhật ảnh đại diện");
        }
        reader.onerror = () => {
            toast.error("Không thể đọc file");
        };
        reader.readAsDataURL(file);
        e.target.value = "";
    }

    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault();
        setIsSubmit(true);

        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsSubmit(false);
        toast.success("Cập nhật hồ sơ thành công");
    }

    // helper cho input
    const handleChange = (field: string, value: any) => {
        updateUser({ [field]: value });
    };

    return {
        isSubmit,
        handleAvatarChange,
        handleSubmit,
        user,
        handleChange
    };
};