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

Search or filter users by name/email

Order users by fields (name, email, etc)

Dark mode support using Tailwind’s dark: utilities

Basic test coverage with Jest or React Testing Library
