# Local-First Next.js App

Offline-capable user directory built with Next.js, Zustand, Dexie.js, and Tailwind CSS.

## Installation

```bash
npm install
```

## Running the Project

```bash
npm run dev
```

Open http://localhost:3000

## How to simulate offline/failure scenarios

### Manual Offline Toggle

1. Click the **"Go Offline"** button in the UI
2. The app will switch to offline mode and show cached data
3. A red indicator will display: "Offline (Showing cached data)"
4. Click **"Go Online"** to restore online mode

## Known issues or limitations

## What you would improve with more time

Currently, the app handles 30 users efficiently without optimization. For production with more users, I would add:

eg.

UserList

```
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return users.slice(startIndex, endIndex);
  }, [users, currentPage, itemsPerPage]);

```

or

Pagination

```
 const pages = useMemo(() => {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }, [totalPages]); // Tylko re-calculate gdy totalPages się zmieni
```

or

```
const UserCard = memo(({ user }: UserCardProps) => {
  const { toggleFavorite } = useStore();
})
```

Users lose favourite status on refresh now, I would update that.

setUsers in Zustand doesn't work 100% if we had filtering, we can end up an empty page as far as I see.

Offline toggle is simulated, not real network detection
The “Go Offline” button only toggles isOffline in Zustand — it doesn’t reflect actual network loss.

A real version should rely on navigator.onLine and window.addEventListener("online"/"offline").

User type is not 1:1 with API type, and also there is no safe layer (also for DB) in case API changes.

No more advanced error banner for API failures, especially if cache is empty at the same time. I would add a dedicated error page and also maybe some retry button.

For now, the app is fully client side, so none of the components really use next.js. For production we would need to discuss that how it should work.

I would add sortby (name, email) /sortDir in Zustand

I would add search or filter by query (also in Zustand)

Dark mode support using Tailwind’s dark: utilities

- Tailwind configured with `darkMode: "class"`.
- Theme state with `next-themes`
- `ThemeToggle` component to toggle dark/light, preference persisted in `localStorage`?
- `dark:` in components

Basic test coverage with Jest or React Testing Library
