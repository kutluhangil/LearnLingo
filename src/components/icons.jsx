export function EyeIcon({ crossedOut }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M1 10s3-6 9-6 9 6 9 6-3 6-9 6-9-6-9-6Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      {crossedOut && (
        <path d="M2 2l16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      )}
    </svg>
  )
}

export function HeartIcon({ filled }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 20.5s-7.5-4.6-10-9.4C.5 7.8 2.4 4.5 6 4.5c2 0 3.6 1.2 6 4 2.4-2.8 4-4 6-4 3.6 0 5.5 3.3 4 6.6-2.5 4.8-10 9.4-10 9.4Z"
        stroke="currentColor"
        strokeWidth="1.6"
        fill={filled ? 'currentColor' : 'none'}
      />
    </svg>
  )
}

export function StarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.2 1.3 6-5.4-3.1-5.4 3.1 1.3-6-4.6-4.2 6.1-.6L10 1.5Z" />
    </svg>
  )
}

export function BookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M2 4.5C2 3.7 2.7 3 3.5 3H9v13H3.5c-.8 0-1.5-.7-1.5-1.5v-10Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M18 4.5c0-.8-.7-1.5-1.5-1.5H11v13h5.5c.8 0 1.5-.7 1.5-1.5v-10Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  )
}
