import { Link, NavLink } from "react-router-dom"
import icon from "../../assets/images/icon.png";

const Header = () => {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/70 bg-slate-950/70 backdrop-blur mb-10">
      <div className="align-element flex h-16 items-center justify-between">
        <Link to="/" className="flex gap-3 items-center">
          <img 
            src={icon} 
            alt="Jobster-Logo"
            className="w-9 h-9 rounded-lg bg-slate-950/60 p-0.5"
          />
          <span className="text-lg font-semibold tracking-tight">
            Sên Jobless
          </span>
        </Link>

        <nav className="items-center gap-6 md:flex">
          <NavLink to="/" className="link-base">
            Trang chủ
          </NavLink>

          <a className="link-base" href="#features">
            Tính năng
          </a>

          <a className="link-base" href="#about">
            Giới thiệu
          </a>
        </nav>

        <div className="items-center flex gap-3">
          <NavLink 
           to="/login"
           className="rounded-lg text-sm font-semibold bg-slate-900/60 text-slate-100 hover:bg-emerald-500 px-4 py-2 transition">
              Đăng nhập
          </NavLink>

          <NavLink 
           to="/register"
           className="rounded-lg text-sm font-semibold bg-emerald-500 text-slate-100 hover:bg-slate-900/60 px-4 py-2 transition">
              Đăng ký
          </NavLink>
        </div>
      </div>
    </header>
  )
}
export default Header