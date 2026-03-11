import { Link } from "react-router-dom"
import loginMain from "../assets/images/loginImg.svg"; 

const NotFound = () => {
  return (
    <main className="grid min-h-screen place-items-center justify-center px-8 bg-slate-950 ">
      <div className="space-y-4 px-4 py-4">
        <img 
          src={loginMain}
          alt="Error"
          className="w-3/4 h-3/4 mx-auto block"
        />
        <p className="text-9xl font-bold text-emerald-800 text-center">404</p>
        <p className="text-slate-300 text-center">Xin lỗi, chúng tôi không tìm thấy trang bạn đang truy cập...</p>
        <Link 
          to="/"
          className="inline-flex items-center rounded-lg px-4 py-2 text-lg font-medium text-slate-500 underline decoration-1 hover:text-emerald-400">
            Về trang chủ
        </Link>
      </div>

    </main>
  )
}

export default NotFound

