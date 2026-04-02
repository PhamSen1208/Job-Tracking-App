import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import icon from "../../assets/images/icon.png"
import { useJobs } from "../../context/JobContext";
import { useState } from "react";

const DashBoardTopBar = () => {
    const { user, logout } = useAuth();
    const { jobs } = useJobs();
    const interviewJobsCount = jobs.filter(job => job.status === 'Interview').length;
    const [open, setOpen] = useState(false);

    const linkBase =
        "text-sm font-medium text-slate-300 hover:text-emerald-400 px-5 py-1 transition-all";
    const linkActive =
        "text-emerald-400 md:border-b-2 border-emerald-400 rounded-none";
    const mobileLinkBase = 
        "block py-3 px-4 text-lg font-medium text-slate-300 hover:text-emerald-400 hover:bg-slate-800/50 rounded-lg transition-all";
    const mobileLinkActive = 
        "text-emerald-400 bg-emerald-500/10";

    const navLinks = [
        { to: "/dashboard", label: "Tổng quan" },
        { to: "/jobs", label: "Công việc" },
        { to: "/add-job", label: "Thêm công việc" },
        { to: "/board", label: "Bảng công việc" },
        { to: "/schedule", label: "Lịch phỏng vấn", badge: interviewJobsCount > 0 },
        { to: "/profile", label: "Hồ sơ" },
    ];

    return (
        <header className="sticky top-0 z-40 border-b border-slate-800/70 bg-slate-950/70 backdrop-blur mb-6">
            <div className="flex items-center justify-between gap-6 py-3 px-4">
                {/* Logo & Brand */}
                <div className="shrink-0">
                    <Link
                        to="/dashboard"
                        className="flex items-center gap-3">
                        <img src={icon} alt="icon" className="h-10 w-10" />
                        <span className="text-xl md:text-2xl font-semibold text-emerald-500 hover:text-emerald-300 tracking-tight">Sên Jobless</span>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-2">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            className={({ isActive }) =>
                                `${linkBase} ${isActive ? linkActive : ""} ${link.badge ? "relative" : ""}`
                            }
                        >
                            {link.label}
                            {link.badge && (
                                <span className="absolute top-0 right-2 flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                                </span>
                            )}
                        </NavLink>
                    ))}
                </nav>

                {/* Desktop User Info & Logout */}
                <div className="hidden md:flex items-center gap-4 text-xs">
                    <div className="flex flex-col items-end">
                        <span className="text-slate-500 text-[10px] uppercase tracking-wider">Xin chào</span>
                        {user && <span className="text-slate-200 font-medium">{user.email}</span>}
                    </div>
                    <button
                        onClick={logout}
                        className="rounded-lg bg-slate-800/50 border border-slate-700 px-4 py-2 text-xs font-semibold text-slate-200 hover:bg-rose-500/20 hover:text-rose-400 hover:border-rose-500/30 transition-all cursor-pointer"
                    >
                        Đăng xuất
                    </button>
                </div>

                {/* Hamburger Button (Mobile) */}
                <button
                    className="md:hidden text-slate-200 text-3xl focus:outline-none p-1"
                    onClick={() => setOpen(!open)}
                    aria-label="Toggle menu"
                >
                    {open ? "✕" : "☰"}
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden bg-slate-900 border-t border-slate-800 overflow-hidden transition-all duration-300 ease-in-out ${
                    open ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
                }`}
            >
                <div className="px-4 py-6 flex flex-col gap-2">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            onClick={() => setOpen(false)}
                            className={({ isActive }) =>
                                `${mobileLinkBase} ${isActive ? mobileLinkActive : ""}`
                            }
                        >
                            <div className="flex items-center justify-between">
                                {link.label}
                                {link.badge && (
                                    <span className="flex h-2 w-2 rounded-full bg-rose-500"></span>
                                )}
                            </div>
                        </NavLink>
                    ))}
                    
                    <div className="mt-4 pt-4 border-t border-slate-800 flex flex-col gap-4">
                        <div className="px-4">
                            <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">Đăng nhập bởi</p>
                            <p className="text-slate-200 font-medium truncate">{user?.email}</p>
                        </div>
                        <button
                            onClick={() => {
                                setOpen(false);
                                logout();
                            }}
                            className="w-full rounded-xl bg-slate-800 px-4 py-4 text-sm font-bold text-rose-400 hover:bg-rose-500/10 transition-all border border-slate-700/50"
                        >
                            Đăng xuất
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default DashBoardTopBar;
