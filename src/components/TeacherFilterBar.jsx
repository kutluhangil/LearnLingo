const LEVELS = [
  'A1 Beginner',
  'A2 Elementary',
  'B1 Intermediate',
  'B2 Upper-Intermediate',
  'C1 Advanced',
  'C2 Proficient',
]

function Select({ label, value, onChange, options }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm text-ink-500">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-xl border border-ink-300 bg-white px-5 py-3 font-semibold text-ink-900 outline-none focus:border-brand-500"
      >
        <option value="">Any</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  )
}

export default function TeacherFilterBar({ filters, onChange, languages, prices }) {
  function setFilter(key, value) {
    onChange({ ...filters, [key]: value })
  }

  return (
    <div className="mb-8 flex flex-wrap gap-6">
      <Select
        label="Languages"
        value={filters.language}
        onChange={(value) => setFilter('language', value)}
        options={languages}
      />
      <Select
        label="Level of knowledge"
        value={filters.level}
        onChange={(value) => setFilter('level', value)}
        options={LEVELS}
      />
      <Select
        label="Price"
        value={filters.price}
        onChange={(value) => setFilter('price', value)}
        options={prices.map((price) => `${price} $`)}
      />
    </div>
  )
}
