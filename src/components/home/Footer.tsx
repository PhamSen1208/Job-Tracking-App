const Footer = () => {
  return (
    <footer className="border-t border-slate border-slate-800/70 bg-slate-950/70 mt-10">
      <div className="align-element flex flex-col gap-3 py-8 text-sm text-slate-400 md:justify-between">
        <p>© {new Date().getFullYear()} Jobster. All rights reserved.</p>

        <div className="flex items-center gap-4">
        <a href="#about" className="hover:text-slate-200 transition">About</a>
        <a href="#features" className="hover:text-slate-200 transition">Features</a>
      </div>
      </div>
    </footer>
  )
}
export default Footer