const DashboardChart = () => {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
      <h2 className="mb-2 text-sm font-semibold text-slate-100">
        Ứng tuyển theo tháng
      </h2>
      <p className="mb-4 text-xs text-slate-500">
        Biểu đồ mô phỏng số lượng job bạn ứng tuyển trong vài tháng gần đây.
      </p>

      {/* Placeholder chart: sau này có thể thay bằng thư viện chart thực sự */}
      <div className="grid h-48 grid-cols-7 items-end gap-3 rounded-lg border border-dashed border-slate-700 px-4 pb-4 pt-6 text-[10px] text-slate-400">
        {[
          { label: "Th1", value: 2 },
          { label: "Th2", value: 1 },
          { label: "Th3", value: 3 },
          { label: "Th4", value: 4 },
          { label: "Th5", value: 3 },
          { label: "Th6", value: 2 },
          { label: "Th7", value: 1 },
        ].map((item) => (
          <div key={item.label} className="flex h-full flex-col items-center justify-end gap-1">
            <div
              className="w-5 rounded-t bg-emerald-500"
              style={{ height: `${item.value * 20}%` }}
            />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardChart;

