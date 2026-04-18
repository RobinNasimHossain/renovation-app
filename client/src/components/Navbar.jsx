import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';

const links = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/projects', label: 'Projects' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Book a Quote' },
];

export default function Navbar() {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-stone-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-white font-bold">
            R
          </span>
          <span className="font-display text-xl font-bold text-stone-900">Renovation</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium ${
                  isActive ? 'text-brand-700 bg-brand-50' : 'text-stone-700 hover:bg-stone-100'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          {isAdmin && (
            <Link to="/admin" className="btn-ghost">
              Admin
            </Link>
          )}
          {user ? (
            <button onClick={handleLogout} className="btn-outline">
              Logout
            </button>
          ) : (
            <Link to="/login" className="btn-outline">
              Login
            </Link>
          )}
          <Link to="/contact" className="btn-primary">
            Get a Quote
          </Link>
        </div>

        <button
          className="md:hidden p-2 rounded-md text-stone-700 hover:bg-stone-100"
          aria-label="Toggle navigation"
          onClick={() => setOpen((v) => !v)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={open ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t border-stone-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2 flex flex-col">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium ${
                    isActive ? 'text-brand-700 bg-brand-50' : 'text-stone-700 hover:bg-stone-100'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            {isAdmin && (
              <Link
                to="/admin"
                onClick={() => setOpen(false)}
                className="px-3 py-2 rounded-md text-sm font-medium text-stone-700 hover:bg-stone-100"
              >
                Admin
              </Link>
            )}
            {user ? (
              <button
                onClick={() => {
                  setOpen(false);
                  handleLogout();
                }}
                className="text-left px-3 py-2 rounded-md text-sm font-medium text-stone-700 hover:bg-stone-100"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="px-3 py-2 rounded-md text-sm font-medium text-stone-700 hover:bg-stone-100"
              >
                Login
              </Link>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
