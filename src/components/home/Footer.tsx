import { FaFacebook, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t border-slate-900 bg-slate-950 mt-20 pt-16 pb-8">
      <div className="align-element">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* CỘT LOGO & GIỚI THIỆU */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-slate-950 font-bold text-xl shadow-lg shadow-emerald-500/20 ">
                J
              </div>
              <span className="text-2xl font-bold text-slate-100 tracking-tight italic">Jobster.</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              Nền tảng quản lý ứng tuyển công việc dành cho lập trình viên. Tổ chức thông minh, gọn gàng.
            </p>
          </div>

          {/* CỘT LIÊN KẾT NHANH */}
          <div className="md:ml-auto">
            <h4 className="text-slate-100 font-bold mb-6 text-sm uppercase tracking-widest">Sản phẩm</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><a href="#about" className="hover:text-emerald-400 transition-colors">Về chúng tôi</a></li>
              <li><a href="#features" className="hover:text-emerald-400 transition-colors">Tính năng</a></li>
              <li><a href="#testimonials" className="hover:text-emerald-400 transition-colors">Khách hàng</a></li>
              <li><a href="#faq" className="hover:text-emerald-400 transition-colors">Hỏi đáp</a></li>
            </ul>
          </div>

          {/* CỘT CỘNG ĐỒNG */}
          <div className="md:ml-auto">
            <h4 className="text-slate-100 font-bold mb-6 text-sm uppercase tracking-widest">Cộng đồng</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><a href="https://www.facebook.com/" className="hover:text-emerald-400 transition-colors">Blog chia sẻ</a></li>
              <li><a href="https://www.facebook.com/" className="hover:text-emerald-400 transition-colors">Tài liệu</a></li>
              <li><a href="/login" className="hover:text-emerald-400 transition-colors">Xây dựng CV</a></li>
            </ul>
          </div>

          {/* CỘT MẠNG XÃ HỘI & LIÊN HỆ */}
          <div className="md:ml-auto">
            <h4 className="text-slate-100 font-bold mb-6 text-sm uppercase tracking-widest">Kết nối</h4>
            <div className="flex gap-4 mb-6">
              <a href="https://github.com/" className="w-10 h-10 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center text-slate-400 hover:text-emerald-500 hover:border-emerald-500/50 transition-all group">
                <FaGithub size={18} />
              </a>
              <a href="https://www.linkedin.com/" className="w-10 h-10 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center text-slate-400 hover:text-emerald-500 hover:border-emerald-500/50 transition-all group">
                <FaLinkedin size={18} />
              </a>
              <a href="https://x.com/" className="w-10 h-10 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center text-slate-400 hover:text-emerald-500 hover:border-emerald-500/50 transition-all group">
                <FaTwitter size={18} />
              </a>
              <a href="https://www.facebook.com/" className="w-10 h-10 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center text-slate-400 hover:text-emerald-500 hover:border-emerald-500/50 transition-all group">
                <FaFacebook size={18} />
              </a>
            </div>
            <p className="text-xs text-slate-600 italic">Hà Nội, Việt Nam</p>
          </div>
        </div>

        {/* BẢN QUYỀN */}
        <div className="pt-8 border-t border-slate-900/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} Jobster. All rights reserved. Crafted by DevTeam.
          </p>
          <div className="flex gap-6 text-[10px] text-slate-600 uppercase tracking-tighter">
            <a href="#" className="hover:text-slate-400 transition-colors">Chính sách bảo mật</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Điều khoản dịch vụ</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;