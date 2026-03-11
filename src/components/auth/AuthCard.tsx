type AuthCardProps = {
  title: string
  subtitle?: string
  children: React.ReactNode
}

const AuthCard = ({title, subtitle, children}: AuthCardProps) => {
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900 px-6 py-8 shadow-xl backdrop-blur-2xl">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-semibold mb-2">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm text-slate-400">
              {subtitle}
          </p>
        )}
      </div>
      {children}
    </div>
  )
}

export default AuthCard

