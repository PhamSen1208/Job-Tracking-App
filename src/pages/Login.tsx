import AuthCard from "../components/auth/AuthCard"
import LoginForm from "../components/auth/LoginForm"
import { Link } from "react-router-dom"

const Login = () => {
  return (
    <section className="flex min-h-[calc(100vh-8rem)] items-center justify-center py-10">
      <div className="w-full max-w-md">
        <AuthCard
          title="Đăng nhập"
          subtitle="Quản lý công việc, theo dõi ứng tuyển và tối ưu hành trình tìm việc của bạn.">
          <LoginForm />
          <p className="text-center mt-6 text-xs text-slate-300">
            Chưa có tài khoản? {" "}
            <Link 
              to="/register"
              className="font-bold text-emerald-500 hover:text-emerald-300">Đăng ký</Link>
          </p>
        </AuthCard>
      </div>
    </section>
  )
}

export default Login

