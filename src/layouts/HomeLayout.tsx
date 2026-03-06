import Header from '../components/home/Header';
import Footer from '../components/home/Footer';
import { Outlet } from 'react-router-dom';

  const HomeLayout = () => {
    return (
      <>
        <div className="min-h-screen bg-slate-950 text-slate-50">
          <Header/>
          <main className="align-element">
            <Outlet/>
          </main>
          <Footer/>
        </div>
      </>
  )
}

export default HomeLayout