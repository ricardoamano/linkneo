import Link from 'next/link';
import { getAllProfiles } from '@/lib/db';
import Logo from '@/components/Logo';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const profiles = await getAllProfiles();

  return (
    <div className="min-h-screen bg-black">
      {/* Mobile top bar */}
      <header className="md:hidden flex items-center gap-3 px-4 py-3 border-b border-gray-800">
        <Link href="/">
          <Logo width={120} height={40} />
        </Link>
        <span className="text-xs text-gray-500 uppercase tracking-wide ml-1">Admin</span>
      </header>

      {/* Mobile nav — horizontal scroll */}
      <nav className="md:hidden flex gap-2 px-4 py-2 overflow-x-auto border-b border-gray-800 scrollbar-none">
        <Link
          href="/admin"
          className="flex-shrink-0 px-3 py-1.5 rounded-full bg-gray-800 text-gray-300 text-xs font-medium hover:bg-gray-700 transition-colors whitespace-nowrap"
        >
          + Novo perfil
        </Link>
        {profiles.map((p) => (
          <Link
            key={p.id}
            href={`/admin/${p.slug}`}
            className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-800 text-gray-300 text-xs font-medium hover:bg-gray-700 transition-colors whitespace-nowrap"
          >
            {p.avatar && !p.avatar.startsWith('http') && (
              <span className="text-sm leading-none">{p.avatar}</span>
            )}
            {p.name}
          </Link>
        ))}
      </nav>

      <div className="md:flex">
        {/* Desktop sidebar */}
        <aside className="hidden md:flex w-56 flex-col flex-shrink-0 min-h-screen border-r border-gray-800">
          <div className="px-5 py-5 border-b border-gray-800">
            <Link href="/">
              <Logo width={130} height={44} />
            </Link>
            <span className="block mt-1 text-xs text-gray-500 uppercase tracking-wide">Admin</span>
          </div>

          <nav className="flex-1 py-3 px-3 overflow-y-auto">
            <Link
              href="/admin"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-400 hover:bg-gray-800 hover:text-white transition-colors mb-1"
            >
              + Novo perfil
            </Link>

            {profiles.length > 0 && (
              <>
                <p className="px-3 py-1 text-xs text-gray-600 uppercase tracking-wide mt-2 mb-1">
                  Perfis
                </p>
                {profiles.map((p) => (
                  <Link
                    key={p.id}
                    href={`/admin/${p.slug}`}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
                  >
                    {p.avatar && !p.avatar.startsWith('http') && (
                      <span className="text-base leading-none">{p.avatar}</span>
                    )}
                    <span className="truncate">{p.name}</span>
                  </Link>
                ))}
              </>
            )}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
