export default function FormField({ label, error, type = 'text', register, name, rightSlot }) {
  return (
    <div>
      <div className="relative">
        <input
          id={name}
          type={type}
          placeholder={label}
          aria-invalid={Boolean(error)}
          className="w-full rounded-xl border border-ink-300 px-5 py-4 text-ink-900 placeholder:text-ink-500 outline-none transition focus:border-brand-500"
          {...register(name)}
        />
        {rightSlot}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  )
}
