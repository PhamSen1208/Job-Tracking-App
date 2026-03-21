import FeatureCard from "./FeatureCard";

const features = [
    {
        title: "Bảng Kanban",
        desc: "Kéo thả và quản lý trạng thái công việc trực quan như Trello.",
    },
    {
        title: "Lịch trình phỏng vấn",
        desc: "Theo dõi các buổi phỏng vấn sắp tới một cách khoa học.",
    },
    {
        title: "Biểu đồ phân tích",
        desc: "Thống kê tình hình ứng tuyển theo tháng bằng biểu đồ trực quan.",
    },
    {
        title: "Quản lý hồ sơ",
        desc: "Lưu trữ thông tin cá nhân, kỹ năng và dự án chuyên nghiệp.",
    },
    {
        title: "Tìm kiếm thông minh",
        desc: "Lọc công việc theo vị trí, công ty và loại hình làm việc.",
    },
    {
        title: "Giao diện Dark Mode",
        desc: "Thiết kế hiện đại, tinh tế giúp bảo vệ mắt khi sử dụng lâu.",
    },
];

const Features = () => {
    return (
        <div id="features" className="grid md:col-span-2 md:grid-cols-3 gap-6 pt-12 border-t border-slate-900">
            {features.map((feature) => (
                <FeatureCard key={feature.title}{...feature}/>
            ))}
        </div>
    );
};
export default Features;