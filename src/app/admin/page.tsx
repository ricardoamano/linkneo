import Link from 'next/link';
import { getAllProfiles } from '@/lib/db';
import ProfileForm from '@/components/admin/ProfileForm';
import { deleteProfileAction } from '@/lib/actions';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const profiles = await getAllProfiles();

  return (
    <div className="px-4 py-8 md:px-8 md:py-10">
      <h1 className="text-xl font-bold text-white mb-6">Perfis</h1>

      {/* Profiles list */}
      {profiles.length > 0 && (
        <div className="bg-white rounded-xl overflow-hidden mb-6">
          <div className="hidden sm:grid grid-cols-[1fr_auto_auto] gap-0">
            <div className="px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide border-b border-gray-100">Perfil</div>
            <div className="px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wide border-b border-gray-100">Slug</div>
            <div className="px-5 py-3 border-b border-gray-100" />
          </div>
          <div className="divide-y divide-gray-100">
            {profiles.map((profile) => (
              <div key={profile.id} className="flex flex-col sm:grid sm:grid-cols-[1fr_auto_auto] items-start sm:items-center gap-2 sm:gap-0 px-5 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-2 font-medium text-gray-900">
                  {profile.avatar && !profile.avatar.startsWith('http') && (
                    <span>{profile.avatar}</span>
                  )}
                  {profile.name}
                </div>
                <div className="px-0 sm:px-5 text-sm text-gray-400">/{profile.slug}</div>
                <div className="flex items-center gap-4 sm:px-5">
                  <Link
                    href={`/${profile.slug}`}
                    target="_blank"
                    className="text-sm text-gray-400 hover:text-gray-700 transition-colors"
                  >
                    Ver
                  </Link>
                  <Link
                    href={`/admin/${profile.slug}`}
                    className="text-sm text-indigo-600 hover:text-indigo-800 transition-colors font-medium"
                  >
                    Editar
                  </Link>
                  <form action={deleteProfileAction}>
                    <input type="hidden" name="id" value={profile.id} />
                    <input type="hidden" name="slug" value={profile.slug} />
                    <button type="submit" className="text-sm text-red-400 hover:text-red-600 transition-colors">
                      Excluir
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Create new profile */}
      <div className="bg-white rounded-xl p-5 md:p-6">
        <h2 className="text-base font-semibold text-gray-900 mb-5">Criar novo perfil</h2>
        <ProfileForm />
      </div>
    </div>
  );
}
