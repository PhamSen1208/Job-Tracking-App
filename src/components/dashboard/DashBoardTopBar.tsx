import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const DashBoardTopBar = () => {
  const { user, logout } = useAuth();

  const linkBase =
    "text-sm font-medium text-slate-300 hover:text-emerald-400 px-5 py-1";
  const linkActive =
    "text-emerald-400 border-b-2 border-emerald-400 rounded-none";

  return (
    <header className="flex items-center justify-between gap-6 pb-1 ">

        <div>
            <Link
                to="/dashboard"
                className="text-2xl font-semibold text-emerald-500 hover:text-emerald-300">
                JOBSTER
            </Link>
        </div>
        <div className="flex items-center justify-between gap-8">
            <nav className="flex items-center gap-2">
            <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : ""}`
                }
            >
                Tổng quan
            </NavLink>
            <NavLink
                to="/jobs"
                className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : ""}`
                }
            >
                Công việc
            </NavLink>
            <NavLink
                to="/add-job"
                className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : ""}`
                }
            >
                Thêm công việc
            </NavLink>
            <NavLink
                to="/profile"
                className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : ""}`
                }
            >
                Hồ sơ
            </NavLink>
            </nav>
        </div>

      <div className="flex items-center gap-3 text-xs text-slate-300"> <span className="text-slate-50 text-sm font-semibold">Xin chào</span>
        {user && <span>{user.email}</span>}
        <button
          onClick={logout}
          className="rounded-md bg-slate-800 px-3 py-2 text-xs font-medium hover:bg-slate-500 hover: cursor-pointer"
        >
          Đăng xuất
        </button>
      </div>
    </header>
  );
};
export default DashBoardTopBar;