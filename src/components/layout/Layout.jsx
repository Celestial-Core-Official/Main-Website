import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import CustomCursor from '../ui/CustomCursor.jsx'
import StarField from '../ui/StarField.jsx'

export default function Layout({ children }) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <CustomCursor />

      {/* Layer 1 - stars (canvas, fixed to viewport) */}
      <StarField />

      {/* Layer 2 - fixed nebula atmosphere, always covers the viewport
          regardless of scroll position, so no page section looks flat/dark */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        {/* Primary cyan nebula - top-left */}
        <div className="absolute -left-[10%] -top-[5%] h-[70vh] w-[70vh] rounded-full bg-nebula-blue/[0.09] blur-[140px]" />
        {/* Purple nebula - right side, vertically centered */}
        <div className="absolute -right-[15%] top-[25%] h-[60vh] w-[60vh] rounded-full bg-nebula-purple/[0.08] blur-[130px]" />
        {/* Deep cyan accent - bottom center */}
        <div className="absolute bottom-[-10%] left-[30%] h-[50vh] w-[50vh] rounded-full bg-nebula-blue/[0.06] blur-[120px]" />
        {/* Gold hint - lower-left */}
        <div className="absolute bottom-[10%] -left-[5%] h-[35vh] w-[35vh] rounded-full bg-nebula-gold/[0.04] blur-[100px]" />
      </div>

      {/* Layer 3 - very subtle grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 grid-overlay opacity-[0.18]"
      />

      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
