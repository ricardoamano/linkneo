import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProfileBySlug } from '@/lib/db';
import ProfileForm from '@/components/admin/ProfileForm';
import LinkForm from '@/components/admin/LinkForm';
import LinkList from '@/components/admin/LinkList';

export const dynamic = 'force-dynamic';

interface Props {
  params: { slug: string };
}

export default async function AdminProfilePage({ params }: Props) {
  const profile = await getProfileBySlug(params.slug);

  if (!profile) notFound();

  return (
    <div className="max-w-3xl mx-auto py-10 px-6">
      <div className="flex items-center gap-3 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
          <Link
            href={`/${profile.slug}`}
            target="_blank"
            className="text-sm text-indigo-500 hover:underline"
          >
            /{profile.slug}
          </Link>
        </div>
      </div>

      {/* Edit profile */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-5">Editar perfil</h2>
        <ProfileForm profile={profile} />
      </div>

      {/* Links list */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-5">Links</h2>
        {profile.links.length === 0 ? (
          <p className="text-gray-400 text-sm">Nenhum link adicionado ainda.</p>
        ) : (
          <LinkList links={profile.links} profileSlug={profile.slug} profileId={profile.id} />
        )}
      </div>

      {/* Add link */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-5">Adicionar link</h2>
        <LinkForm profileId={profile.id} profileSlug={profile.slug} />
      </div>
    </div>
  );
}
