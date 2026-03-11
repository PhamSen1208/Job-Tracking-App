import AuthCard from "../components/auth/AuthCard"
import RegisterForm from "../components/auth/RegisterForm"
import { Link } from "react-router-dom"
const Register = () => {
  return (
    <section className="flex min-h-[calc(100vh-8rem)] items-center justify-center py-10">
      <div className="w-full max-w-md">
        <AuthCard
          title="Đăng ký"
          subtitle="Tạo tài khoản mới để quản lý các đơn xin việc của bạn.">
            <RegisterForm/>
            <p className="text-center mt-2 text-xs text-slate-300">
              Chuyển sang đăng nhập? {" "}
              <Link 
                to="/login"
                className="font-bold text-emerald-500 hover:text-emerald-300">Đăng nhập</Link>
            </p>
          </AuthCard>
      </div>
    </section>
  )
}

export default Register

