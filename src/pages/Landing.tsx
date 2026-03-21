import Hero from "../components/hero/Hero"
import Stats from "../components/hero/Stats"
import Testimonials from "../components/hero/Testimonials"
import FAQ from "../components/hero/FAQ"
import About from "../components/hero/About"

const Landing = () => {
  return (
    <div className="space-y-10">
      <Hero />
      <Stats />
      <About />
      <Testimonials />
      <FAQ />
    </div>
  )
}

export default Landing