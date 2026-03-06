import { Outlet } from "react-router-dom"

const DashBoardLayout = () => {
    return (
      <main className="min-h-screen flex bg-slate-950 text-slate-50">
        <div className="align-element py-6">
            <Outlet/>
        </div>
      </main>
    )
  }
  
  export default DashBoardLayout