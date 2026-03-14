import { Outlet } from "react-router-dom";
import DashboardTopBar from "../components/dashboard/DashboardTopBar";

const DashBoardLayout = () => {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="sticky top-0 z-40 backdrop-blur border-b border-slate-900">
        <div className="align-element py-4">
          <DashboardTopBar />
        </div>
      </div>

      <div className="align-element py-6">
        <Outlet />
      </div>
    </main>
  );
};

export default DashBoardLayout;