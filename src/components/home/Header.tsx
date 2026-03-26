import { Link, NavLink } from "react-router-dom";
import icon from "../../assets/images/icon.png";
import { useState } from "react";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/70 bg-slate-950/70 backdrop-blur mb-10">
      <div className="align-element flex h-16 items-center justify-between px-4">
        {/* Logo */}
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

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <NavLink to="/" className="link-base">
            Trang chủ
          </NavLink>
          <a href="#features" className="link-base">
            Tính năng
          </a>
          <a href="#about" className="link-base">
            Giới thiệu
          </a>
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <NavLink
            to="/login"
            className="rounded-lg text-sm font-semibold bg-slate-900/60 text-slate-100 hover:bg-emerald-500 px-4 py-2 transition"
          >
            Đăng nhập
          </NavLink>
          <NavLink
            to="/register"
            className="rounded-lg text-sm font-semibold bg-emerald-500 text-slate-100 hover:bg-slate-900/60 px-4 py-2 transition"
          >
            Đăng ký
          </NavLink>
        </div>

        {/* Hamburger Button - chỉ hiện trên mobile */}
        <button
          className="md:hidden text-slate-200 text-3xl focus:outline-none"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-slate-900 border-t border-slate-800 overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="px-6 py-6 flex flex-col gap-5 text-lg">
          <NavLink
            to="/"
            className="link-base py-2"
            onClick={() => setOpen(false)}
          >
            Trang chủ
          </NavLink>
          <a
            href="#features"
            className="link-base py-2"
            onClick={() => setOpen(false)}
          >
            Tính năng
          </a>
          <a
            href="#about"
            className="link-base py-2"
            onClick={() => setOpen(false)}
          >
            Giới thiệu
          </a>

          <div className="pt-4 border-t border-slate-900 flex flex-col gap-3">
            <NavLink
              to="/login"
              className="rounded-lg text-center font-semibold bg-slate-00/60 text-slate-100 hover:bg-emerald-600 py-3 transition"
              onClick={() => setOpen(false)}
            >
              Đăng nhập
            </NavLink>
            <NavLink
              to="/register"
              className="rounded-lg text-center font-semibold bg-emerald-500 text-slate-100 hover:bg-emerald-600 py-3 transition"
              onClick={() => setOpen(false)}
            >
              Đăng ký
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;