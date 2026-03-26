import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useJobStore } from '../../store/useJobStore';

const DashboardChart = () => {
    const jobs = useJobStore((state) => state.jobs);

    // Xử lý dữ liệu gom nhóm theo tháng
    const chartData = jobs.reduce((acc: any[], job) => {
        // Lấy tháng từ chuỗi date (YYYY-MM-DD)
        const date = new Date(job.date);
        const month = `Tháng ${date.getMonth() + 1}`;
        
        let monthData = acc.find(item => item.name === month);
        
        if (!monthData) {
            monthData = { name: month, "Đang chờ": 0, "Phỏng vấn": 0, "Từ chối": 0 };
            acc.push(monthData);
        }
        
        // Tăng số lượng theo status
        if (job.status === 'Pending') monthData["Đang chờ"]++;
        else if (job.status === 'Interview') monthData["Phỏng vấn"]++;
        else if (job.status === 'Reject') monthData["Từ chối"]++;
        
        return acc;
    }, []).sort((a, b) => a.name.localeCompare(b.name));

    return (
        <div className="h-[350px] w-full bg-slate-900/40 p-6 rounded-2xl border border-slate-800 shadow-xl">
            <div className="mb-6 flex items-center justify-between font-semibold tracking-wide">
                <h3 className="text-slate-200">Thống kê ứng tuyển theo tháng</h3>
                <div className="flex gap-4 text-[10px] uppercase text-slate-500">
                    <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-emerald-500"></span> Chờ</span>
                    <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-blue-500"></span> PV</span>
                    <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-red-500"></span> Trượt</span>
                </div>
            </div>

            <ResponsiveContainer width="100%" height="80%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                    <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#64748b', fontSize: 12 }} 
                        dy={10}
                    />
                    <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#64748b', fontSize: 12 }} 
                    />
                    <Tooltip 
                        cursor={{ fill: '#334155', opacity: 0.4 }}
                        contentStyle={{ 
                            backgroundColor: '#0f172a', 
                            border: '1px solid #1e293b', 
                            borderRadius: '12px',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                        }}
                        itemStyle={{ fontSize: '13px' }}
                    />
                    <Bar dataKey="Đang chờ" fill="#10b981" radius={[4, 4, 0, 0]} barSize={25} />
                    <Bar dataKey="Phỏng vấn" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={25} />
                    <Bar dataKey="Từ chối" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={25} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default DashboardChart;
