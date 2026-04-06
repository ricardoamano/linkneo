import Link from 'next/link';
import { getAllProfiles } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const profiles = await getAllProfiles();

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-60 bg-white border-r border-gray-200 flex flex-col flex-shrink-0">
        <div className="px-5 py-4 border-b border-gray-200">
          <Link href="/" className="text-lg font-bold text-indigo-600">
            Linkneo
          </Link>
          <span className="ml-2 text-xs text-gray-400 uppercase tracking-wide">Admin</span>
        </div>

        <nav className="flex-1 overflow-y-auto py-3 px-3">
          <Link
            href="/admin"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors mb-1"
          >
            + Novo perfil
          </Link>

          {profiles.length > 0 && (
            <>
              <p className="px-3 py-1 text-xs text-gray-400 uppercase tracking-wide mt-2">
                Perfis
              </p>
              {profiles.map((p) => (
                <Link
                  key={p.id}
                  href={`/admin/${p.slug}`}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-colors"
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

      {/* Main */}
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
