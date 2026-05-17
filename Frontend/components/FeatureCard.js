import ScrollReveal from './ScrollReveal'

export default function FeatureCard({ icon: Icon, title, description, index = 0 }) {
  return (
    <ScrollReveal delay={index * 0.1}>
      <div className="card-hover p-8 h-full group">
        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-white/10 transition-all duration-500">
          <Icon className="w-6 h-6 text-white/70" />
        </div>
        <h3 className="text-lg font-semibold mb-3">{title}</h3>
        <p className="text-white/40 text-sm leading-relaxed">{description}</p>
      </div>
    </ScrollReveal>
  )
}
