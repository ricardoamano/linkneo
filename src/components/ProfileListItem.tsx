import Link from 'next/link';
import type { Profile } from '@/types';

interface Props {
  profile: Profile;
}

export default function ProfileListItem({ profile }: Props) {
  const isUrl = profile.avatar?.startsWith('http');

  return (
    <Link
      href={`/${profile.slug}`}
      className="flex items-center gap-4 bg-white rounded-xl px-5 py-4 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex-shrink-0">
        {profile.avatar ? (
          isUrl ? (
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <span className="text-3xl leading-none">{profile.avatar}</span>
          )
        ) : (
          <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-xl">
            👤
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-gray-900 truncate">{profile.name}</p>
        <p className="text-sm text-gray-400 truncate">/{profile.slug}</p>
      </div>
      <span className="text-gray-300 text-lg">›</span>
    </Link>
  );
}
