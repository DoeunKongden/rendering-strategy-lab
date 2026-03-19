import Image from 'next/image'

export default function ItemList({ items, loading = false, title = "Item" }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="card animate-pulse p-4">
            <div className="flex items-center space-x-4">
              <div className="bg-gray-300 dark:bg-slate-700 h-16 w-16 rounded-lg"></div>
              <div className="flex-1">
                <div className="h-5 bg-gray-300 dark:bg-slate-700 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 dark:bg-slate-700 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (!items || items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500 dark:text-slate-400">No {title.toLowerCase()}s found.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="card hover:shadow-lg transition-shadow p-4 group"
        >
          <div className="flex items-start space-x-4">
            <div className="relative flex-shrink-0">
              <Image
                src={item.avatar || `https://api.dicebear.com/7.x/identicon/svg?seed=${item.id}`}
                alt={item.name}
                width={64}
                height={64}
                className="rounded-lg object-cover"
              />
              <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                #{item.id}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 truncate">
                {item.name}
              </h3>
              {item.email && (
                <p className="text-sm text-slate-500 dark:text-slate-400 truncate">{item.email}</p>
              )}
              {item.price && (
                <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mt-1">${item.price}</p>
              )}
              {item.breed && (
                <p className="text-sm text-violet-600 dark:text-violet-400 mt-1">🐕 {item.breed}</p>
              )}
            </div>
          </div>
          {item.createdAt && (
            <div className="mt-3 pt-3 border-t border-gray-100 dark:border-slate-700">
              <p className="text-xs text-slate-400 dark:text-slate-500">
                Added: {new Date(item.createdAt).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
