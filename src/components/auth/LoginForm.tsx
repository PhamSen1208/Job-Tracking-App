//Login form: quản lý dữ liệu email, password, quên mật khẩu.
// Xử lý submit
// Hiển thị lỗi/ trạng thái lỗi
// Khi dữ liệu có thể thay đổi do user, API, logic và cần cập nhật lại UI -> dùng useState :)). Remember
import { useState } from "react"
import google from "../../assets/images/google.svg";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const LoginForm = () => {
  //Thiết lập các state cần thiết
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

     //Validate
     if(!email.trim() || !password.trim())
     {
      setError("Vui lòng nhập đầy đủ email và mật khẩu.");
      return;
    }

    if(!email.includes("@"))
    {
      setError("Email không hợp lệ.");
      return;
    }

    try 
     {
      setIsLoading(true);
      await login(email, password);
      navigate("/dashboard");
     } catch {
       setError("Đăng nhập thất bại, vui lòng thử lại.");
     } finally {
       setIsLoading(false);
     }
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        {/*Email*/}
        <label 
          htmlFor="email" 
          className="block text-sm font-medium text-slate-200">
          Email
        </label>
        <input 
          type="email"
          id="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full rounded 
            border border-slate-700 bg-slate-900/60
            px-3 py-2
            text-sm text-slate-50 
            focus:border-emerald-500 focus:outline-none focus:ring-1  focus:ring-emerald-500" 
          placeholder="example@gmail.com"
        />
      </div>

      {/*Password*/}
      <div className="space-y-2">
        <label 
          htmlFor="password" 
          className="block text-sm font-medium text-slate-200">
          Mật khẩu
        </label>
        <input 
          type="password"
          id="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full rounded 
            border border-slate-700 bg-slate-900/60
            px-3 py-2
            text-sm text-slate-50
            focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500" 
          placeholder="••••••••"
        />
      </div>

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
      {/*Error */}
      {error && (
        <p className="text-xs text-red-400">
          {error}
        </p>
      )}
      {/*Đăng nhập*/}
      <button 
        type="submit"
        disabled={isLoading}
        className="flex w-full items-center justify-center font-medium px-4 py-2.5 bg-emerald-500 rounded-lg text-lg disabled:cursor-not-allowed disabled:opacity-70">
          {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
      </button>

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

