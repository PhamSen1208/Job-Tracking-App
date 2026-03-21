import { FaRocket, FaShieldAlt, FaChartLine } from "react-icons/fa";

const About = () => {
    return (
        <section id="about" className="py-20 border-t border-slate-900">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-3xl font-bold text-slate-100 mb-6">Tại sao nên chọn Jobster?</h2>
                    <p className="text-slate-400 leading-relaxed mb-8">
                        Jobster không chỉ là một trình quản lý danh sách công việc đơn thuần. Chúng tôi xây dựng một hệ sinh thái giúp bạn tối ưu hóa lộ trình sự nghiệp, từ việc theo dõi các ứng tuyển cho đến phân tích hiệu quả tìm việc.
                    </p>
                    
                    <ul className="space-y-4">
                        <li className="flex items-start gap-4">
                            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                                <FaRocket />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-200">Tăng tốc độ tìm việc</h4>
                                <p className="text-sm text-slate-500 text-pretty">Quản lý tập trung giúp bạn không bao giờ bỏ lỡ một buổi phỏng vấn hay phản hồi từ nhà tuyển dụng.</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-4">
                            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                                <FaShieldAlt />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-200">Dữ liệu cá nhân an toàn</h4>
                                <p className="text-sm text-slate-500 text-pretty">Thông tin về hồ sơ và các dự án của bạn được lưu trữ an toàn và luôn sẵn sàng để bạn tham khảo.</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-4">
                            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                                <FaChartLine />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-200">Phân tích chuyên sâu</h4>
                                <p className="text-sm text-slate-500 text-pretty">Nhìn thấy bức tranh tổng quan về quá trình tìm việc của mình để đưa ra các điều chỉnh phù hợp.</p>
                            </div>
                        </li>
                    </ul>
                </div>
                
                <div className="bg-slate-900/40 p-1 rounded-xl border border-slate-800 shadow-2xl overflow-hidden group">
                    <div className="aspect-video bg-linear-to-br rounded-xl from-emerald-500/20 to-blue-500/20 flex items-center justify-center p-8 ">
                         <div className="text-center">
                            <div className="text-5xl mb-4">🚀</div>
                            <h3 className="text-xl font-bold text-emerald-400 mb-2">Sẵn sàng để bắt đầu?</h3>
                            <p className="text-slate-400 text-sm max-w-xs mx-auto italic">"Cơ hội chỉ đến với những ai đã sẵn sàng."</p>
                         </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
