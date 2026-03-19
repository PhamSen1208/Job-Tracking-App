import { useState, useCallback } from 'react';

//Nhận giá trị string và trả về string | null (Tkey|Tvalue) mỗi field sẽ có 1 hàm kiểm tra là value
type validationRules = Record<string, (value: any) => string | null>

//Mỗi form khác nhau nên T thay đổi
export const useFormValidation = <T extends Record<string, any>> 
(
    initialState: T,
    rules: validationRules     
) => {
    const [form, setForm] = useState(initialState);
    //Mỗi field sẽ có 1 kiểu thông báo error (email/password)
    const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({})

    const validate = useCallback(() => {
        //Khởi tạo biến lưu thông báo lỗi
        const newErrors: Partial<Record<keyof T, string>> = {};
        let isValid = true;

        //Lặp qua các field(email, password...)
        Object.keys(rules).forEach(field => {
            const error = rules[field](form[field as keyof T])
            if(error)
            {
                newErrors[field as keyof T] = error
                isValid = false;
            }
        })
        setErrors(newErrors);
        return isValid
    },[form, rules])

    const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
        // Clear error của field này khi user sửa
        setErrors(prev => ({ ...prev, [name]: undefined }))
    },[])

    const reset = () => {
        setForm(initialState)
        setErrors({})
    }

    return { form, errors, validate, handleChange, reset, setForm }

};

