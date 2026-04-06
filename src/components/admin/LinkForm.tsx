'use client';

import { useFormStatus } from 'react-dom';
import { createLinkAction, updateLinkAction } from '@/lib/actions';
import type { Link } from '@/types';

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white text-sm font-medium rounded-lg transition-colors"
    >
      {pending ? 'Salvando...' : label}
    </button>
  );
}

interface Props {
  profileId: number;
  profileSlug: string;
  link?: Link;
  onCancel?: () => void;
}

export default function LinkForm({ profileId, profileSlug, link, onCancel }: Props) {
  const action = link ? updateLinkAction : createLinkAction;

  return (
    <form action={action} className="flex flex-col gap-4">
      <input type="hidden" name="profile_id" value={profileId} />
      <input type="hidden" name="profileSlug" value={profileSlug} />
      {link && <input type="hidden" name="id" value={link.id} />}

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Título *</label>
          <input
            name="title"
            type="text"
            required
            defaultValue={link?.title ?? ''}
            placeholder="Ex: Notion do time"
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Ícone</label>
          <input
            name="icon"
            type="text"
            defaultValue={link?.icon ?? ''}
            placeholder="📄  (emoji opcional)"
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">URL *</label>
        <input
          name="url"
          type="url"
          required
          defaultValue={link?.url ?? ''}
          placeholder="https://..."
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      <div className="flex justify-end gap-3 pt-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
        )}
        <SubmitButton label={link ? 'Salvar link' : 'Adicionar link'} />
      </div>
    </form>
  );
}
