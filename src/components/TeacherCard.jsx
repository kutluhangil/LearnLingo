import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import FavoriteButton from './FavoriteButton'
import GuestNoticeModal from './GuestNoticeModal'
import BookTrialModal from './BookTrialModal'
import { BookIcon, StarIcon } from './icons'

export default function TeacherCard({ teacher, isFavorite, onToggleFavorite }) {
  const { user } = useAuth()
  const [expanded, setExpanded] = useState(false)
  const [showGuestNotice, setShowGuestNotice] = useState(false)
  const [showBooking, setShowBooking] = useState(false)

  function handleFavoriteClick() {
    if (!user) {
      setShowGuestNotice(true)
      return
    }
    onToggleFavorite(teacher.id)
  }

  return (
    <article className="flex gap-6 rounded-3xl bg-white p-8 shadow-[0_4px_24px_rgba(18,20,23,0.06)]">
      <div className="relative h-28 w-28 flex-shrink-0">
        <img
          src={teacher.avatar_url}
          alt=""
          className="h-full w-full rounded-full border-2 border-brand-300 object-cover"
        />
        <span className="absolute right-1 top-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-success-500" />
      </div>

      <div className="flex-1">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-ink-500">Languages</p>
            <h3 className="text-2xl font-bold text-ink-900">
              {teacher.name} {teacher.surname}
            </h3>
          </div>

          <div className="flex items-center gap-4 text-sm text-ink-700">
            <span className="flex items-center gap-1.5">
              <BookIcon /> Lessons online
            </span>
            <span>Lessons done: {teacher.lessons_done}</span>
            <span className="flex items-center gap-1 text-brand-500">
              <StarIcon /> Rating: {teacher.rating}
            </span>
            <span>
              Price / 1 hour: <b className="text-success-500">{teacher.price_per_hour}$</b>
            </span>
            <FavoriteButton isActive={isFavorite} onClick={handleFavoriteClick} />
          </div>
        </div>

        <p className="mt-4 text-ink-700">
          <span className="text-ink-500">Speaks: </span>
          <span className="font-semibold underline">{teacher.languages.join(', ')}</span>
        </p>
        <p className="mt-2 text-ink-700">
          <span className="text-ink-500">Lesson Info: </span>
          <span className="font-semibold">{teacher.lesson_info}</span>
        </p>
        <p className="mt-2 text-ink-700">
          <span className="text-ink-500">Conditions: </span>
          <span className="font-semibold">{teacher.conditions.join(' ')}</span>
        </p>

        {expanded ? (
          <>
            <p className="mt-4 text-ink-700">{teacher.experience}</p>
            <ul className="mt-4 flex flex-col gap-4">
              {teacher.reviews.map((review) => (
                <li key={review.reviewer_name} className="flex gap-3">
                  <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-brand-100 font-semibold text-brand-600">
                    {review.reviewer_name[0]}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-ink-900">{review.reviewer_name}</span>
                      <span className="flex items-center gap-1 text-sm text-brand-500">
                        <StarIcon /> {review.reviewer_rating}.0
                      </span>
                    </div>
                    <p className="text-ink-700">{review.comment}</p>
                  </div>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="mt-3 font-semibold text-ink-900 underline"
          >
            Read more
          </button>
        )}

        <div className="mt-5 flex flex-wrap gap-2">
          {teacher.levels.map((level, index) => (
            <span
              key={level}
              className={`rounded-2xl border px-4 py-1.5 text-sm font-semibold ${
                index === 0
                  ? 'border-brand-400 bg-brand-400 text-ink-900'
                  : 'border-ink-300 text-ink-700'
              }`}
            >
              #{level}
            </span>
          ))}
        </div>

        {expanded && (
          <button
            type="button"
            onClick={() => setShowBooking(true)}
            className="mt-6 rounded-xl bg-brand-400 px-8 py-4 font-bold text-ink-900 transition hover:bg-brand-500"
          >
            Book trial lesson
          </button>
        )}
      </div>

      <GuestNoticeModal isOpen={showGuestNotice} onClose={() => setShowGuestNotice(false)} />
      <BookTrialModal teacher={teacher} isOpen={showBooking} onClose={() => setShowBooking(false)} />
    </article>
  )
}
