import Link from 'next/link';
import Image from 'next/image';
import { getAllProfiles } from '@/lib/db';
import ProfileListItem from '@/components/ProfileListItem';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const profiles = await getAllProfiles();

  return (
    <main className="min-h-screen bg-black py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link href="/">
            <Image src="/logo.png" alt="Neostore" width={140} height={48} className="object-contain" />
          </Link>
          <Link
            href="/admin"
            className="text-sm text-gray-500 hover:text-white transition-colors"
          >
            Admin
          </Link>
        </div>

        {profiles.length === 0 ? (
          <div className="text-center py-16 text-gray-600">
            <p className="text-lg">Nenhum perfil criado ainda.</p>
            <Link href="/admin" className="mt-4 inline-block text-indigo-400 hover:underline">
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
