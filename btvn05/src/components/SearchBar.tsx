interface SearchBarProps {
  keyword: string
  onChange: (value: string) => void
}

export default function SearchBar({ keyword, onChange }: SearchBarProps) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="🔍 Tìm kiếm sản phẩm..."
        value={keyword}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  )
}