import { Link } from 'react-router-dom'

const HeroContent = () => {
    return (
        <div className="space-y-6">
            <h1 className="font-bold text-4xl tracking-tight md:text-5xl grid gap-2 leading-tight">
                Quản lý công việc 
                <span className="block bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent pb-0.5">
                    thông minh & hiệu quả
                </span>
            </h1>
            <p className="text-slate-300 text-lg">
                Theo dõi công việc, trạng thái ứng tuyển và lịch phỏng vấn của bạn trong
                một dashboard gọn gàng. Hãy đăng ký ngay!
            </p>
            <div className="flex flex-wrap gap-3">
                <Link 
                    to="/register"
                    className="rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-emerald-400 transition">
                    Bắt đầu ngay
                </Link>
                <Link 
                    to="/login"
                    className="rounded-lg border border-slate-700 px-5 py-2.5 text-sm font-semibold text-slate-50 hover:border-slate-500 hover:bg-slate-900/60 transition">
                    Đăng nhập
                </Link>
            </div>
        </div>
    )
}
export default HeroContent