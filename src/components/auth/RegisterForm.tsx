import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";

// Zod schema for registration validation
const registerSchema = z.object({
  //Email
  email: z.string().min(1, { message: "Email không được để trống" }).email({ message: "Email không đúng định dạng" }),
  //Mật khẩu
  password: z
    .string()
    .min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" })
    .regex(/[A-Za-z]/, { message: "Mật khẩu phải chứa chữ cái" })
    .regex(/[0-9]/, { message: "Mật khẩu phải chứa số" })
    .regex(/[!@#$%^&*]/, { message: "Mật khẩu phải chứa ký tự đặc biệt (!@#$%^&*)" }),
  confirmPassword: z.string().min(1, { message: "Vui lòng xác nhận mật khẩu" }),
  //Kiểm tra mật khẩu và xác nhận mật khẩu có khớp nhau không
}).refine((data) => data.password === data.confirmPassword, { 
  message: "Mật khẩu xác nhận không khớp",
  path: ["confirmPassword"],
});
//Khai báo kiểu dữ liệu cho form
type RegisterFormValues = z.infer<typeof registerSchema>;

const RegisterForm = () => {
  //Lấy thông tin từ AuthContext 
  const { register: registerAuth, error, clearError, isLoading } = useAuth();
  //Navigate để chuyển hướng trang
  const navigate = useNavigate();
  //Sử dụng useForm để quản lý form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      if (error) clearError();
      await registerAuth(data.email, data.password);
      navigate("/dashboard");
      toast.success("Đăng ký tài khoản thành công!");
    } catch {
      toast.error("Đăng ký không thành công!");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/*Email*/}
      <Input
        label="Email"
        type="email"
        placeholder="example@gmail.com"
        {...register("email")}
        error={errors.email?.message}
      />

      {/*Mật khẩu*/}
      <Input
        label="Mật khẩu"
        type="password"
        placeholder="••••••••"
        {...register("password")}
        error={errors.password?.message}
      />

      {/*Xác nhận mật khẩu*/}
      <Input
        label="Xác nhận mật khẩu"
        type="password"
        placeholder="••••••••"
        {...register("confirmPassword")}
        error={errors.confirmPassword?.message}
      />

      <Button type="submit" isLoading={isLoading} className="mt-10">
        {isLoading ? "Đang đăng ký..." : "Đăng ký"}
      </Button>

      {/* Error message from Context with smooth transition */}
      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400 flex items-center gap-2 justify-between transition-all duration-300" role="alert">
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span>{error}</span>
          </div>
          {/* Close button */}
          <button
            type="button"
            onClick={clearError}
            className="ml-auto text-red-400 hover:text-red-300 font-bold"
            aria-label="Close error">
            ✕
          </button>
        </div>
      )}

      <div className="relative py-2 text-center text-xs text-slate-500">
        <span className="absolute inset-x-0 top-1/2 -z-10 h-px bg-slate-800" />
        <span className="relative bg-slate-900/60 px-3">Đã có tài khoản</span>
      </div>
    </form>
  )
}

export default RegisterForm