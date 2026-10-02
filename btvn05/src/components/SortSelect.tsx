import type { SortBy } from '../types'

interface SortSelectProps {
  value: SortBy
  onChange: (value: SortBy) => void
}

export default function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <select
      className="sort-select"
      value={value}
      onChange={(event) => onChange(event.target.value as SortBy)}
    >
      <option value="name-asc">Tên A → Z</option>
      <option value="name-desc">Tên Z → A</option>
      <option value="price-asc">Giá tăng dần</option>
      <option value="price-desc">Giá giảm dần</option>
    </select>
  )
}