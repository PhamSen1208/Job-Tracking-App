import background from "../../assets/images/background-img.svg";

const HeroImage = () => {
  return (
    <div className="relative">

    <div className="absolute -inset-8 rounded-3xl bg-emerald-500/20 blur-xl" aria-hidden="true"/>
    <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60">
      <img src={background} alt="backdrop" className="w-full h-auto object-cover" />
    </div>
  </div>
  )
}
export default HeroImage