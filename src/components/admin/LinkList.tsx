'use client';

import { useState } from 'react';
import { deleteLinkAction, reorderLinksAction } from '@/lib/actions';
import LinkForm from './LinkForm';
import type { Link } from '@/types';

interface Props {
  links: Link[];
  profileSlug: string;
  profileId: number;
}

export default function LinkList({ links: initialLinks, profileSlug, profileId }: Props) {
  const [links, setLinks] = useState(initialLinks);
  const [editingId, setEditingId] = useState<number | null>(null);

  function move(index: number, direction: -1 | 1) {
    const newLinks = [...links];
    const swapIndex = index + direction;
    if (swapIndex < 0 || swapIndex >= newLinks.length) return;
    [newLinks[index], newLinks[swapIndex]] = [newLinks[swapIndex], newLinks[index]];
    setLinks(newLinks);

    const formData = new FormData();
    formData.set('profileId', String(profileId));
    formData.set('profileSlug', profileSlug);
    formData.set('orderedIds', JSON.stringify(newLinks.map((l) => l.id)));
    reorderLinksAction(formData);
  }

  return (
    <div className="flex flex-col divide-y divide-gray-100">
      {links.map((link, index) => (
        <div key={link.id} className="py-3 first:pt-0 last:pb-0">
          {editingId === link.id ? (
            <LinkForm
              profileId={profileId}
              profileSlug={profileSlug}
              link={link}
              onCancel={() => setEditingId(null)}
            />
          ) : (
            <div className="flex items-center gap-3">
              {/* Reorder buttons */}
              <div className="flex flex-col gap-0.5">
                <button
                  type="button"
                  onClick={() => move(index, -1)}
                  disabled={index === 0}
                  className="text-gray-300 hover:text-gray-600 disabled:opacity-20 text-xs leading-none px-1"
                  aria-label="Mover para cima"
                >
                  ▲
                </button>
                <button
                  type="button"
                  onClick={() => move(index, 1)}
                  disabled={index === links.length - 1}
                  className="text-gray-300 hover:text-gray-600 disabled:opacity-20 text-xs leading-none px-1"
                  aria-label="Mover para baixo"
                >
                  ▼
                </button>
              </div>

              {/* Link info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  {link.icon && <span className="text-base leading-none">{link.icon}</span>}
                  <span className="font-medium text-gray-900 text-sm truncate">{link.title}</span>
                </div>
                <p className="text-xs text-gray-400 truncate">{link.url}</p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setEditingId(link.id)}
                  className="text-indigo-500 hover:text-indigo-700 text-sm font-medium transition-colors"
                >
                  Editar
                </button>
                <form action={deleteLinkAction}>
                  <input type="hidden" name="id" value={link.id} />
                  <input type="hidden" name="profileSlug" value={profileSlug} />
                  <button
                    type="submit"
                    className="text-red-400 hover:text-red-600 text-sm transition-colors"
                  >
                    Excluir
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
