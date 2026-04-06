import Link from 'next/link';
import { getAllProfiles } from '@/lib/db';
import ProfileListItem from '@/components/ProfileListItem';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const profiles = await getAllProfiles();

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Linkneo</h1>
          <Link
            href="/admin"
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            Admin
          </Link>
        </div>

        {profiles.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg">Nenhum perfil criado ainda.</p>
            <Link href="/admin" className="mt-4 inline-block text-indigo-600 hover:underline">
              Criar primeiro perfil
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {profiles.map((profile) => (
              <ProfileListItem key={profile.id} profile={profile} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
