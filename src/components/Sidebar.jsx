const filters = [
  { key: "world", label: "🌍 World" },
  { key: "country", label: "🇮🇳 Country" },
  { key: "state", label: "🏙 State" },
  { key: "local", label: "📍 Local" },
];

export default function Sidebar({ filter, setFilter }) {
  return (
    <aside className="w-48 bg-gray-100 dark:bg-gray-800 border-r dark:border-gray-700 hidden sm:block">
      <nav className="flex flex-col p-4 gap-3">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-3 py-2 rounded text-left font-medium ${
              filter === f.key
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
            }`}
          >
            {f.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
