import Image from 'next/image'

export default function UserList({ users, loading = false }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-4 animate-pulse">
            <div className="flex items-center space-x-4">
              <div className="bg-gray-300 dark:bg-slate-700 h-12 w-12 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-300 dark:bg-slate-700 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-300 dark:bg-slate-700 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (!users || users.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-slate-400">No users found.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {users.map((user) => (
        <div
          key={user.id}
          className="bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-4"
        >
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Image
                src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`}
                alt={user.name}
                width={48}
                height={48}
                className="rounded-full"
              />
              <span className="absolute -bottom-1 -right-1 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                #{user.id}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 truncate">
                {user.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-slate-400 truncate">{user.email}</p>
            </div>
          </div>
          {user.createdAt && (
            <div className="mt-3 pt-3 border-t border-gray-100 dark:border-slate-700">
              <p className="text-xs text-gray-400 dark:text-slate-500">
                Created: {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
