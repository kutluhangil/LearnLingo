import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'learnlingo_favorites'

function readStoredFavorites() {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return []
  return JSON.parse(raw)
}

export function useFavorites() {
  const [favorites, setFavorites] = useState(readStoredFavorites)

  useEffect(() => {
    function handleStorage(event) {
      if (event.key === STORAGE_KEY) {
        setFavorites(readStoredFavorites())
      }
    }
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  const toggleFavorite = useCallback((teacherId) => {
    setFavorites((current) => {
      const next = current.includes(teacherId)
        ? current.filter((id) => id !== teacherId)
        : [...current, teacherId]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  const isFavorite = useCallback((teacherId) => favorites.includes(teacherId), [favorites])

  return { favorites, isFavorite, toggleFavorite }
}
