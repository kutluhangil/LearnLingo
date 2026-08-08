import { get, limitToFirst, orderByKey, query, ref } from 'firebase/database'
import { db } from './firebase'

export async function fetchTeachers(limit) {
  const teachersQuery = query(ref(db, 'teachers'), orderByKey(), limitToFirst(limit))
  const snapshot = await get(teachersQuery)
  if (!snapshot.exists()) return []

  const value = snapshot.val()
  return Object.entries(value).map(([id, teacher]) => ({ id, ...teacher }))
}
