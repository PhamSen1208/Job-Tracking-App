import { Outlet} from "react-router-dom"
import DashBoardTopBar from "../components/dashboard/DashBoardTopBar"
const DashBoardLayout = () => {
    return (
      <main className="min-h-screen flex bg-slate-950 text-slate-50">
        <div className="align-element py-6 w-full">
            <DashBoardTopBar/>
            <Outlet/>
        </div>
      </main>
    )
  }
  
  export default DashBoardLayout