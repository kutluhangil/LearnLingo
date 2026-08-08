import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-24 text-center">
      <h1 className="text-4xl font-extrabold text-ink-900">Page not found</h1>
      <Link to="/" className="font-semibold text-brand-500 underline">
        Back to home
      </Link>
    </div>
  )
}
