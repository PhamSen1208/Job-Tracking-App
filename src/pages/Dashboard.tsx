import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardStats from "../components/dashboard/DashboardStats";
import DashboardChart from "../components/dashboard/DashboardChart";
import DashboardJobs from "../components/dashboard/DashboardJobs";
import DashboardSuggestions from "../components/dashboard/DashboardSuggestions";

const Dashboard = () => {
  return (
    <section className="space-y-8">
      <DashboardHeader />
      <DashboardStats />
      <DashboardChart />

      <div className="grid gap-6 lg:grid-cols-3">
        <DashboardJobs />
        <DashboardSuggestions />
      </div>
    </section>
  );
};

export default Dashboard;