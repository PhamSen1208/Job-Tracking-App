const stats = [
  { label: 'Jobs theo dõi', value: '1,200+' },
  { label: 'Tỷ lệ phản hồi', value: '32%' },
  { label: 'Thời gian cập nhật', value: '< 1s' },
  { label: 'Templates CV', value: '10+' },
]

const Stats = () => {
  return (
    <section className="pt-10 md:pt-14">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 md:p-8">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-200">
              Được thiết kế cho hành trình ứng tuyển của bạn
            </p>
            <p className="mt-1 text-sm text-slate-300">
              Theo dõi rõ ràng, tối ưu thời gian và tập trung vào điều quan trọng.
            </p>
          </div>
          <p className="text-xs text-slate-400">
            *Số liệu minh hoạ cho UI demo
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-800 bg-slate-950/40 p-5"
            >
              <p className="text-2xl font-bold tracking-tight text-white">
                {item.value}
              </p>
              <p className="mt-1 text-sm text-slate-400">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Stats

