const faqs = [
  {
    q: 'Jobster dùng để làm gì?',
    a: 'Theo dõi các job bạn đã ứng tuyển: công ty, vị trí, trạng thái (pending/interview/declined), ghi chú và ngày hẹn.',
  },
  {
    q: 'Có cần backend ngay không?',
    a: 'Chưa cần. Ta có thể bắt đầu với mock data/localStorage, sau đó mới nối API thật.',
  },
  {
    q: 'Mình có thể tuỳ biến giao diện không?',
    a: 'Có. Tailwind giúp bạn chỉnh theme, spacing và component rất nhanh (và dễ đồng bộ).',
  },
]

const FAQ = () => {
  return (
    <section className="pt-10 md:pt-14">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 md:p-8">
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
          Câu hỏi thường gặp
        </h2>
        <p className="mt-2 text-sm text-slate-300 md:text-base">
          Một vài câu hỏi để người dùng hiểu rõ sản phẩm ngay từ trang chủ.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {faqs.map((item) => (
            <div
              key={item.q}
              className="rounded-2xl border border-slate-800 bg-slate-950/30 p-5"
            >
              <p className="text-sm font-semibold text-white">{item.q}</p>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ

