import { NavLink } from 'react-router-dom'
import { FaChess } from "react-icons/fa";
import ButtonSecondary from './ButtonSecondary';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 w-full h-40 grid grid-cols-3 grid-rows-2 items-center bg-club-primary text-club-dark px-4">

      {/* LEFT — Logo */}
      <div className="row-span-2 flex items-center justify-start">
        <img
          src="/logo.png"
          alt="Club Logo"
          className="h-28 w-28 rounded-full transition-transform duration-300 hover:scale-110"
        />
      </div>

      {/* CENTER — Club name */}
      <div className="col-start-2 row-start-1 flex items-center justify-center">
        <FaChess className="h-8 w-8" />
        <p className="mx-3 text-4xl font-bold tracking-wide text-center">
          Hanoi Lucky Chess Club
        </p>
        <FaChess className="h-8 w-8" />
      </div>

      {/* CENTER — Navigation */}
      <div className="col-start-2 row-start-2 flex justify-center">
        <ol className="flex items-center gap-6 font-semibold">
          <NavLinkItem to="/" label="Home" />
          <NavLinkItem to="/about" label="About" />
          <NavLinkItem to="/events" label="Events" />
          <NavLinkItem to="/members" label="Members" />
          <NavLinkItem to="/contact" label="Contact" />
        </ol>
      </div>

      {/* RIGHT — Auth buttons */}
      <div className="h-full ml-40 row-span-2 flex items-end justify-end gap-3 py-4">
        <ButtonSecondary label="Join Now" size="md" onClick={() => navigate('/signup')} />
        <ButtonSecondary label="Login" size="md" onClick={() => navigate('/login')} />
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
            'min-w-40 px-4 py-2 rounded-md text-base font-medium',
            'border border-club-secondary',
            'transition-all duration-300 ease-out',
            isActive
              ? 'px-6 bg-club-dark/20 text-club-dark min-w-50'
              : 'hover:px-6 hover:bg-club-secondary/10 hover:text-club-secondary hover:min-w-50',
          ].join(' ')
        }
      >
        {label}
      </NavLink>
    </li>
  )
}

export default Header