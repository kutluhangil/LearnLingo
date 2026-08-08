import { HeartIcon } from './icons'

export default function FavoriteButton({ isActive, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      aria-label={isActive ? 'Remove from favorites' : 'Add to favorites'}
      className={isActive ? 'text-brand-400' : 'text-ink-900 hover:text-brand-400'}
    >
      <HeartIcon filled={isActive} />
    </button>
  )
}
