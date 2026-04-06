import Link from 'next/link';
import { getAllProfiles } from '@/lib/db';
import ProfileForm from '@/components/admin/ProfileForm';
import { deleteProfileAction } from '@/lib/actions';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const profiles = await getAllProfiles();

  return (
    <div className="max-w-3xl mx-auto py-10 px-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Perfis</h1>

      {/* Existing profiles table */}
      {profiles.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-10">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-5 py-3 font-medium text-gray-500">Perfil</th>
                <th className="text-left px-5 py-3 font-medium text-gray-500">Slug</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {profiles.map((profile) => (
                <tr key={profile.id} className="hover:bg-gray-50">
                  <td className="px-5 py-3 font-medium text-gray-900">
                    <div className="flex items-center gap-2">
                      {profile.avatar && !profile.avatar.startsWith('http') && (
                        <span>{profile.avatar}</span>
                      )}
                      {profile.name}
                    </div>
                  </td>
                  <td className="px-5 py-3 text-gray-500">/{profile.slug}</td>
                  <td className="px-5 py-3 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/${profile.slug}`}
                        target="_blank"
                        className="text-gray-400 hover:text-gray-700 transition-colors"
                      >
                        Ver
                      </Link>
                      <Link
                        href={`/admin/${profile.slug}`}
                        className="text-indigo-600 hover:text-indigo-800 transition-colors font-medium"
                      >
                        Editar
                      </Link>
                      <form action={deleteProfileAction}>
                        <input type="hidden" name="id" value={profile.id} />
                        <input type="hidden" name="slug" value={profile.slug} />
                        <button
                          type="submit"
                          className="text-red-400 hover:text-red-600 transition-colors"
                        >
                          Excluir
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Create new profile */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-5">Criar novo perfil</h2>
        <ProfileForm />
      </div>
    </div>
  );
}
