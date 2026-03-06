import FeatureCard from "./FeatureCard";

const features = [
    {
        title: "Quản lý trạng thái",
        desc: "Pending/ Interview/ Declined...",
    },
    {
        title: "Tìm kiếm & lọc",
        desc: "Lọc theo vị trí, công ty, ngày tạo và mức độ ưu tiên.",
    },
    {
        title: "Giao diện hiện đại",
        desc: "Tailwind + Vite cho trải nghiệm nhanh và mượt",
    },
];

const Features = () => {
    return (
        <div  className="grid md:col-span-2 md:grid-cols-3 gap-4 pt-6">
            {features.map((feature) => (
                <FeatureCard key={feature.title}{...feature}/>
            ))}
        </div>
    );
};
export default Features;