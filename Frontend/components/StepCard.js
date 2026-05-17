import ScrollReveal from './ScrollReveal'

export default function StepCard({ number, title, description, index = 0 }) {
  return (
    <ScrollReveal delay={index * 0.12}>
      <div className="card-hover p-8 h-full group relative overflow-hidden">
        <span className="absolute top-6 right-6 text-6xl font-bold text-white/[0.03] font-display select-none">
          {String(number).padStart(2, '0')}
        </span>
        <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center mb-6 text-sm font-semibold text-white/50 group-hover:border-white/30 group-hover:text-white transition-all duration-500">
          {number}
        </div>
        <h3 className="text-lg font-semibold mb-3">{title}</h3>
        <p className="text-white/40 text-sm leading-relaxed">{description}</p>
      </div>
    </ScrollReveal>
  )
}
