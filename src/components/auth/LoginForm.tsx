
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import google from "../../assets/images/google.svg";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { Input } from "../ui/Input"
import { Button } from "../ui/Button"

// Zod Schema
const loginSchema = z.object({
  email: z.string().min(1, { message: "Email không được để trống" }).email({ message: "Email không đúng định dạng" }),
  password: z.string().min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" }),
})

type LoginFormValues = z.infer<typeof loginSchema>

const LoginForm = () => {
  const { login, error, clearError, isLoading } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  })

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await login(data.email, data.password);
      navigate("/dashboard");
      toast.success("Đăng nhập thành công!");
    } catch (err) {
      toast.error("Đăng nhập không thành công!");
    }
  }
  
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

      {/*Password*/}
      <Input 
        label="Mật khẩu"
        type="password"
        placeholder="••••••••"
        {...register("password")}
        error={errors.password?.message}
      />

      {/*Ghi nhớ đăng nhập*/}
      <div className="flex items-center justify-between">
        <label className="inline-flex text-xs items-center gap-2 text-slate-300">
          <input 
            type="checkbox"
            className="h-3.5 w-3.5"/>
          Ghi nhớ đăng nhập
        </label>
        <Link 
          to="/register"
          className="font-medium text-slate-500 hover:text-slate-200 text-xs">Quên mật khẩu?</Link>
      </div>

      {/*Error box from API (if any)*/}
      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400 flex items-center gap-2 justify-between transition-all duration-300" role="alert">
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span>{error}</span>
          </div>
          <button
            type="button"
            onClick={clearError}
            className="ml-auto text-red-400 hover:text-red-300 font-bold"
            aria-label="Close error">
            ✕
          </button>
        </div>
      )}

      {/*Submit*/}
      <Button type="submit" isLoading={isLoading} className="mt-2 hover:cursor-pointer">
        {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
      </Button>

      {/*Ngăn*/}
      <div className="relative py-2 text-center text-xs text-slate-500">
        <span className="absolute inset-x-0 top-1/2 -z-10 h-px bg-slate-800" />
        <span className="relative bg-slate-900/60 px-3">Hoặc</span>
      </div>

      {/*Đăng nhập với google*/}
      <button
        type="button"
        className="flex w-full items-center justify-center gap-3 
          rounded-lg border border-slate-700 bg-slate-900/60 px-4 py-2.5 
          text-sm font-medium text-slate-100 transition 
          hover:border-slate-500 hover:bg-slate-800/80">
          <span className="h-4 w-4 rounded-full bg-slate-700" />
          Đăng nhập với Google 
          <img 
            src={google} 
            alt="google-icon"
            className="h-6 w-6 object-cover" />
      </button>
    </form>
  )
}

export default LoginForm
