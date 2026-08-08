import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import LoginModal from './auth/LoginModal'
import RegisterModal from './auth/RegisterModal'

const navLinkClass = ({ isActive }) =>
  `text-base font-medium transition ${isActive ? 'text-ink-900' : 'text-ink-500 hover:text-ink-900'}`

export default function Header() {
  const { user, logout } = useAuth()
  const [modal, setModal] = useState(null)

  return (
    <header className="border-b border-ink-100">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <NavLink to="/" className="flex items-center gap-2">
          <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
            <circle cx="14" cy="14" r="14" fill="#3B82C4" />
            <path d="M0 14a14 14 0 0 1 28 0Z" fill="#F4C550" />
          </svg>
          <span className="text-lg font-extrabold text-ink-900">LearnLingo</span>
        </NavLink>

        <nav className="flex items-center gap-8">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/teachers" className={navLinkClass}>
            Teachers
          </NavLink>
          {user && (
            <NavLink to="/favorites" className={navLinkClass}>
              Favorites
            </NavLink>
          )}
        </nav>

        {user ? (
          <div className="flex items-center gap-4">
            <span className="font-medium text-ink-900">{user.displayName || user.email}</span>
            <button
              type="button"
              onClick={logout}
              className="rounded-xl border border-ink-300 px-5 py-2.5 font-semibold text-ink-900 transition hover:bg-ink-100"
            >
              Log out
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => setModal('login')}
              className="flex items-center gap-1.5 font-medium text-ink-900"
            >
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path
                  d="M8 4l6 6-6 6M3 10h11"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Log in
            </button>
            <button
              type="button"
              onClick={() => setModal('register')}
              className="rounded-xl bg-ink-900 px-6 py-3 font-semibold text-white transition hover:bg-ink-700"
            >
              Registration
            </button>
          </div>
        )}
      </div>

      <LoginModal isOpen={modal === 'login'} onClose={() => setModal(null)} />
      <RegisterModal isOpen={modal === 'register'} onClose={() => setModal(null)} />
    </header>
  )
}
