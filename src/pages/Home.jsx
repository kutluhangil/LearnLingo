import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import RegisterModal from '../components/auth/RegisterModal'

const STATS = [
  { value: '32,000+', label: 'Experienced tutors' },
  { value: '300,000+', label: '5-star tutor reviews' },
  { value: '120+', label: 'Subjects taught' },
  { value: '200+', label: 'Tutor nationalities' },
]

export default function Home() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [showRegister, setShowRegister] = useState(false)

  function handleGetStarted() {
    if (user) {
      navigate('/teachers')
    } else {
      setShowRegister(true)
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="flex flex-col justify-center rounded-3xl bg-ink-100 p-10 md:p-14">
          <h1 className="text-5xl font-extrabold leading-tight text-ink-900">
            Unlock your potential with the best{' '}
            <span className="rounded bg-brand-300 px-1 italic">language</span> tutors
          </h1>
          <p className="mt-6 text-lg text-ink-500">
            Embark on an Exciting Language Journey with Expert Language Tutors: Elevate your
            language proficiency to new heights by connecting with highly qualified and
            experienced tutors.
          </p>
          <button
            type="button"
            onClick={handleGetStarted}
            className="mt-8 w-fit rounded-xl bg-brand-400 px-8 py-4 text-lg font-bold text-ink-900 transition hover:bg-brand-500"
          >
            Get started
          </button>
        </div>

        <div className="overflow-hidden rounded-3xl bg-brand-100">
          <img
            src="/images/hero.png"
            alt="3D illustration of a tutor greeting from behind a laptop"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <dl className="mt-8 grid grid-cols-2 gap-6 rounded-3xl border-2 border-dashed border-brand-400 p-10 md:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="flex items-baseline gap-3">
            <dt className="text-3xl font-extrabold text-ink-900">{stat.value}</dt>
            <dd className="text-sm text-ink-500">{stat.label}</dd>
          </div>
        ))}
      </dl>

      <RegisterModal isOpen={showRegister} onClose={() => setShowRegister(false)} />
    </div>
  )
}
