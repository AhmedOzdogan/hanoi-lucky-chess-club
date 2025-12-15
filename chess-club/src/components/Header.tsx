import { NavLink } from 'react-router-dom'
import { FaChess } from "react-icons/fa";

function Header() {
  return (
    <header className="fixed top-0 w-full h-40 grid grid-cols-[auto_1fr_auto] grid-rows-2 items-center bg-club-primary text-club-dark px-6">
      {/* Logo */}
      <div className="row-span-2 flex items-center justify-center">
        <img
          src="/logo.png"
          alt="Club Logo"
          className="h-28 w-28 rounded-full transition-transform duration-300 hover:scale-110"
        />
      </div>

      {/* Row 1 — Club name */}
      <div className="col-start-2 col-end-3 flex items-center justify-center">
        <FaChess className="h-8 w-8" />
        <p className="mx-3 text-4xl font-bold tracking-wide">
          Hanoi Lucky Chess Club
        </p>
        <FaChess className="h-8 w-8" />
      </div>

      {/* Row 2 — Navigation */}
      <div className="col-start-2 col-end-3 flex justify-center">
        <ol className="flex items-center gap-6 font-semibold">
          <NavLinkItem to="/" label="Home" />
          <NavLinkItem to="/about" label="About" />
          <NavLinkItem to="/events" label="Events" />
          <NavLinkItem to="/members" label="Members" />
          <NavLinkItem to="/contact" label="Contact" />
        </ol>
      </div>

      {/* auth later) */}
      <div className="row-span-2 col-start-3 flex items-center justify-end">
        {/* Login / Signup */}
      </div>
    </header>
  )
}

function NavLinkItem({ to, label }: { to: string; label: string }) {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          [
            'inline-flex items-center justify-center',
            'min-w-40 px-4 py-2 rounded-md text-lg font-medium',
            'border border-club-secondary',
            'transition-all duration-300 ease-out',
            isActive
              ? 'px-6 bg-club-dark/20 text-club-dark min-w-60'
              : 'hover:px-6 hover:bg-club-secondary/10 hover:text-club-secondary hover:min-w-60',
          ].join(' ')
        }
      >
        {label}
      </NavLink>
    </li>
  )
}

export default Header