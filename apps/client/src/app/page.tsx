import { UserList } from "@/components/UserList";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <main className="max-w-7xl mx-auto px-4 py-8">
        <UserList />
      </main>
    </div>
  );
}
