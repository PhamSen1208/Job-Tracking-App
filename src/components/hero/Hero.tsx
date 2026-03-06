import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";
import Features from "./Features";

const Hero = () => {
  return (
    <section className="gap-10 grid md:grid-cols-2 md:items-center">
        <HeroContent/>
        <HeroImage/>
        <Features/>
    </section>
  )
}
export default Hero