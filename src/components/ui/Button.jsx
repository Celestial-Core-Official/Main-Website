import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const VARIANTS = {
  primary:
    'inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-nebula-blue to-nebula-purple font-semibold text-white shadow-glow transition-shadow hover:shadow-glow-lg',
  outline:
    'inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.02] font-semibold text-white/90 transition hover:border-white/30 hover:bg-white/[0.06]',
  ghost:
    'inline-flex items-center justify-center gap-2 rounded-full font-semibold text-white/80 transition hover:bg-white/[0.04] hover:text-white'
}

const SIZES = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-2.5 text-sm md:text-base',
  lg: 'px-7 py-3.5 text-base'
}

const MOTION_PROPS = {
  whileHover: { y: -2 },
  whileTap: { y: 0, scale: 0.98 },
  transition: { type: 'spring', stiffness: 400, damping: 22 }
}

const Button = forwardRef(function Button(
  {
    to,
    href,
    variant = 'primary',
    size = 'md',
    icon: Icon,
    iconPosition = 'right',
    children,
    className = '',
    type = 'button',
    ...props
  },
  ref
) {
  const classes = `${VARIANTS[variant]} ${SIZES[size]} ${className}`.trim()

  const inner = (
    <>
      {Icon && iconPosition === 'left' && <Icon className="h-4 w-4" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="h-4 w-4" />}
    </>
  )

  if (to) {
    return (
      <motion.span {...MOTION_PROPS} className="inline-block">
        <Link ref={ref} to={to} className={classes} {...props}>
          {inner}
        </Link>
      </motion.span>
    )
  }

  if (href) {
    return (
      <motion.a
        ref={ref}
        href={href}
        className={classes}
        {...MOTION_PROPS}
        {...props}
      >
        {inner}
      </motion.a>
    )
  }

  return (
    <motion.button
      ref={ref}
      type={type}
      className={classes}
      {...MOTION_PROPS}
      {...props}
    >
      {inner}
    </motion.button>
  )
})

export default Button
