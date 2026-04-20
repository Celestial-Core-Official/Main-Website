const SIZES = {
  xs: 'text-[11px] px-2 py-0.5',
  sm: 'text-xs px-2.5 py-1',
  md: 'text-sm px-3 py-1.5'
}

export default function TechBadge({
  label = 'PLACEHOLDER',
  icon: Icon,
  size = 'sm',
  className = ''
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] font-mono font-medium uppercase tracking-wider text-white/75 transition hover:border-white/30 hover:bg-white/[0.06] hover:text-white hover:shadow-glow-sm ${SIZES[size]} ${className}`.trim()}
    >
      {Icon && <Icon className="h-3.5 w-3.5" />}
      {label}
    </span>
  )
}
