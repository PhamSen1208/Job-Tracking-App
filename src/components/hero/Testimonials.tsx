const testimonials = [
  {
    name: 'Minh Anh',
    role: 'Frontend Intern',
    quote:
      'Mình theo dõi 20+ job một lúc. Jobster giúp mình biết job nào đang pending, job nào đến lịch interview chỉ trong 1 màn hình.',
  },
  {
    name: 'Quang Huy',
    role: 'Junior Developer',
    quote:
      'UI rõ ràng, filter nhanh. Mình thích phần trạng thái vì nó giúp mình không bị “quên” các job đã apply.',
  },
  {
    name: 'Thảo Vy',
    role: 'Designer',
    quote:
      'Một dashboard nhẹ, đẹp, dễ dùng. Landing nhìn chuyên nghiệp và đồng bộ với trải nghiệm bên trong.',
  },
]

const Testimonials = () => {
  return (
    <section className="pt-10 md:pt-14">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Người dùng nói gì?
          </h2>
          <p className="mt-2 text-sm text-slate-300 md:text-base">
            Một vài nhận xét (demo) để trang landing “có chiều sâu” hơn.
          </p>
        </div>
        <div className="hidden md:block text-xs text-slate-400">
          Social proof
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {testimonials.map((t) => (
          <figure
            key={t.name}
            className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6"
          >
            <blockquote className="text-sm text-slate-200 leading-relaxed">
              “{t.quote}”
            </blockquote>
            <figcaption className="mt-4 text-sm">
              <p className="font-semibold text-white">{t.name}</p>
              <p className="text-slate-400">{t.role}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

export default Testimonials

