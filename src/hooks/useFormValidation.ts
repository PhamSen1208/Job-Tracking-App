import { useState } from "react";

// Generic hook, dùng được cho bất kỳ form nào
export const useFormValidation = <T extends Record<string, any>>(
    initialState: T,
    validationRules?: Partial<Record<keyof T, (value: any) => string | null>>
) => {
    const [form, setForm] = useState<T>(initialState);
    const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        // Xóa lỗi khi người dùng bắt đầu nhập lại
        if (errors[name as keyof T]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const validate = (): boolean => {
        if (!validationRules) return true;
        const newErrors: Partial<Record<keyof T, string>> = {};
        let isValid = true;

        for (const field in validationRules) {
            const rule = validationRules[field];
            const error = rule?.(form[field]);
            if (error) {
                newErrors[field] = error;
                isValid = false;
            }
        }
        setErrors(newErrors);
        return isValid;
    };

    const reset = () => {
        setForm(initialState);
        setErrors({});
    };

    return { form, errors, handleChange, validate, reset };
};
