import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import CustomCursor from '../ui/CustomCursor.jsx'

export default function Layout({ children }) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <CustomCursor />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 grid-overlay opacity-[0.35]"
      />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
