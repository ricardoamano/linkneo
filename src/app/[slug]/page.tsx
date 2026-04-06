import { notFound } from 'next/navigation';
import { getProfileBySlug } from '@/lib/db';
import ProfileCard from '@/components/ProfileCard';
import LinkButton from '@/components/LinkButton';

export const dynamic = 'force-dynamic';

interface Props {
  params: { slug: string };
}

export default async function ProfilePage({ params }: Props) {
  const profile = await getProfileBySlug(params.slug);

  if (!profile) notFound();

  return (
    <ProfileCard profile={profile}>
      {profile.links.map((link) => (
        <LinkButton key={link.id} link={link} />
      ))}
    </ProfileCard>
  );
}
