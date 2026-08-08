import { useEffect, useMemo, useState } from 'react'
import { fetchTeachers } from '../lib/teachers'
import { useFavorites } from '../hooks/useFavorites'
import TeacherFilterBar from '../components/TeacherFilterBar'
import TeacherCard from '../components/TeacherCard'

const PAGE_SIZE = 4
const ALL_TEACHERS_LIMIT = 200

export default function Teachers() {
  const { isFavorite, toggleFavorite } = useFavorites()
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [teachers, setTeachers] = useState([])
  const [allTeachers, setAllTeachers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filters, setFilters] = useState({ language: '', level: '', price: '' })

  useEffect(() => {
    fetchTeachers(ALL_TEACHERS_LIMIT).then(setAllTeachers).catch(() => {})
  }, [])

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError('')

    fetchTeachers(visibleCount)
      .then((result) => {
        if (!cancelled) setTeachers(result)
      })
      .catch(() => {
        if (!cancelled) setError('Öğretmenler yüklenemedi.')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [visibleCount])

  const languageOptions = useMemo(
    () => [...new Set(allTeachers.flatMap((teacher) => teacher.languages))].sort(),
    [allTeachers],
  )
  const priceOptions = useMemo(
    () => [...new Set(allTeachers.map((teacher) => teacher.price_per_hour))].sort((a, b) => a - b),
    [allTeachers],
  )

  const filteredTeachers = teachers.filter((teacher) => {
    if (filters.language && !teacher.languages.includes(filters.language)) return false
    if (filters.level && !teacher.levels.includes(filters.level)) return false
    if (filters.price && teacher.price_per_hour !== Number(filters.price.replace(' $', '')))
      return false
    return true
  })

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <TeacherFilterBar
        filters={filters}
        onChange={setFilters}
        languages={languageOptions}
        prices={priceOptions}
      />

      {error && <p className="text-red-600">{error}</p>}

      <div className="flex flex-col gap-6">
        {filteredTeachers.map((teacher) => (
          <TeacherCard
            key={teacher.id}
            teacher={teacher}
            isFavorite={isFavorite(teacher.id)}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>

      {loading && <p className="mt-6 text-center text-ink-500">Loading…</p>}

      {!loading && teachers.length < allTeachers.length && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
            className="rounded-xl bg-brand-400 px-10 py-4 font-bold text-ink-900 transition hover:bg-brand-500"
          >
            Load more
          </button>
        </div>
      )}
    </div>
  )
}
