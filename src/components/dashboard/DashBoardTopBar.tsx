import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const DashBoardTopBar = () => {
    const {user, logout} = useAuth();
    return (
        <header className="mb-4 flex items-center justify-between border-b border-slate-900 pb-3">
            <Link to="/dashboard" className="text-lg font-semibold text-emerald-400">
                Jobster Dashboard
            </Link>
            <div className="flex items-center gap-3 text-xs text-slate-300">
                {user && <span>{user.email}</span>}

                <button
                    onClick={logout}
                    className="rounded-md bg-slate-800 px-3 py-2 text-xs font-medium hover:bg-slate-700">
                    Đăng xuất
                </button>
            </div>
        </header>
  )
}
export default DashBoardTopBar