import { useEffect, useState } from 'react'
import { fetchTeachers } from '../lib/teachers'
import { useFavorites } from '../hooks/useFavorites'
import TeacherCard from '../components/TeacherCard'

const ALL_TEACHERS_LIMIT = 200

export default function Favorites() {
  const { favorites, isFavorite, toggleFavorite } = useFavorites()
  const [allTeachers, setAllTeachers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchTeachers(ALL_TEACHERS_LIMIT)
      .then(setAllTeachers)
      .catch(() => setError('Öğretmenler yüklenemedi.'))
      .finally(() => setLoading(false))
  }, [])

  const favoriteTeachers = allTeachers.filter((teacher) => favorites.includes(teacher.id))

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      {error && <p className="text-red-600">{error}</p>}
      {loading && <p className="text-ink-500">Loading…</p>}

      {!loading && favoriteTeachers.length === 0 && (
        <p className="text-ink-500">You haven't added any teachers to your favorites yet.</p>
      )}

      <div className="flex flex-col gap-6">
        {favoriteTeachers.map((teacher) => (
          <TeacherCard
            key={teacher.id}
            teacher={teacher}
            isFavorite={isFavorite(teacher.id)}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>
    </div>
  )
}
