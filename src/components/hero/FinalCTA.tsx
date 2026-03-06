import { Link } from 'react-router-dom'

const FinalCTA = () => {
  return (
    <section className="pt-10 pb-6 md:pt-14">
      <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/40 p-8 md:p-10">
        <div
          className="pointer-events-none absolute -inset-10 bg-gradient-to-r from-emerald-500/20 via-cyan-500/10 to-transparent blur-3xl"
          aria-hidden="true"
        />

        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-2xl font-bold tracking-tight md:text-3xl">
              Sẵn sàng tối ưu hành trình ứng tuyển?
            </h3>
            <p className="mt-2 text-sm text-slate-300 md:text-base">
              Tạo tài khoản và bắt đầu theo dõi job của bạn ngay hôm nay.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/register"
              className="rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-emerald-400 transition"
            >
              Đăng ký miễn phí
            </Link>
            <Link
              to="/login"
              className="rounded-lg border border-slate-700 px-5 py-2.5 text-sm font-semibold text-slate-50 hover:border-slate-500 hover:bg-slate-900/60 transition"
            >
              Mình đã có tài khoản
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FinalCTA

