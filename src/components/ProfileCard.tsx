import Link from 'next/link';
import type { Profile } from '@/types';

interface Props {
  profile: Profile;
  children?: React.ReactNode;
}

export default function ProfileCard({ profile, children }: Props) {
  const isUrl = profile.avatar?.startsWith('http');
  const bgColor = profile.bg_color ?? '#7c3aed';

  return (
    <main
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{ backgroundColor: bgColor }}
    >
      {/* Back button */}
      <Link
        href="/"
        className="fixed top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/20 hover:bg-black/30 text-white text-sm transition-colors backdrop-blur-sm"
      >
        ← Voltar
      </Link>

      <div className="w-full max-w-md flex flex-col items-center gap-3">
        {/* Avatar */}
        <div className="mb-1">
          {profile.avatar ? (
            isUrl ? (
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-20 h-20 rounded-full object-cover border-2 border-white/40"
              />
            ) : (
              <span className="text-6xl leading-none">{profile.avatar}</span>
            )
          ) : (
            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-3xl">
              👤
            </div>
          )}
        </div>

        {/* Name */}
        <h1 className="text-2xl font-bold text-white">{profile.name}</h1>

        {/* Description */}
        {profile.description && (
          <p className="text-white/80 text-center text-sm max-w-xs">{profile.description}</p>
        )}

        {/* Links */}
        <div className="w-full flex flex-col gap-3 mt-4">{children}</div>
      </div>
    </main>
  );
}
