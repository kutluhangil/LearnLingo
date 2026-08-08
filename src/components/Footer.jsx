export default function Footer() {
  return (
    <footer className="border-t border-ink-100 py-8">
      <div className="mx-auto max-w-6xl px-6 text-sm text-ink-500">
        © {new Date().getFullYear()} LearnLingo. All rights reserved.
      </div>
    </footer>
  )
}
