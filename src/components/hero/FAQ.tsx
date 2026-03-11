const faqs = [
  {
    q: 'Jobster dùng để làm gì?',
    a: 'Theo dõi các job bạn đã ứng tuyển: công ty, vị trí, trạng thái (pending/interview/declined), ghi chú và ngày hẹn.',
  },
  {
    q: 'Jobster liệu có cần thiết cho người tìm việc không?',
    a: 'Đối với sinh viên, người cần công việc và rải 1 số lượng lớn CV thì Jobster hoàn toàn phù hợp.',
  },
  {
    q: 'Giao diện của Jobster cần có sự thay đổi để phù hợp với logic của khách hàng hơn',
    a: 'Đồng ý. Hiện tại dev đang thu thập các ý kiến người dùng để nâng cao chất lượng trải nghiệm và hoàn thiện UI.',
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

