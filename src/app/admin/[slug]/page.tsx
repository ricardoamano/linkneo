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
    <div className="px-4 py-8 md:px-8 md:py-10">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-white">{profile.name}</h1>
        <Link
          href={`/${profile.slug}`}
          target="_blank"
          className="text-sm text-indigo-400 hover:underline"
        >
          /{profile.slug}
        </Link>
      </div>

      {/* Edit profile */}
      <div className="bg-white rounded-xl p-5 md:p-6 mb-4">
        <h2 className="text-base font-semibold text-gray-900 mb-5">Editar perfil</h2>
        <ProfileForm profile={profile} />
      </div>

      {/* Links list */}
      <div className="bg-white rounded-xl p-5 md:p-6 mb-4">
        <h2 className="text-base font-semibold text-gray-900 mb-5">Links</h2>
        {profile.links.length === 0 ? (
          <p className="text-gray-400 text-sm">Nenhum link adicionado ainda.</p>
        ) : (
          <LinkList links={profile.links} profileSlug={profile.slug} profileId={profile.id} />
        )}
      </div>

      {/* Add link */}
      <div className="bg-white rounded-xl p-5 md:p-6">
        <h2 className="text-base font-semibold text-gray-900 mb-5">Adicionar link</h2>
        <LinkForm profileId={profile.id} profileSlug={profile.slug} />
      </div>
    </div>
  );
}
