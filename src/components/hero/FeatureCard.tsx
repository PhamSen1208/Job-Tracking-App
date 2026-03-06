interface FeatureCardProps {
    title: string
    desc: string
}

const FeatureCard = ({title, desc}: FeatureCardProps) => {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
        <p className="text-sm font-medium ">{title}</p>
        <p className="text-sm mt-2 text-slate-300">{desc}</p>
    </div>
  )
}
export default FeatureCard