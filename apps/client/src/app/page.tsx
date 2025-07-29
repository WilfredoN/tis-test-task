import { UserList } from '@/components/UserList'

export default function HomePage() {
  return (
    <div className='min-h-screen bg-gray-900'>
      <main className='mx-auto max-w-7xl px-4 py-8'>
        <UserList />
      </main>
    </div>
  )
}
