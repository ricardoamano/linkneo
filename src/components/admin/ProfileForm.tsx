'use client';

import { useFormStatus } from 'react-dom';
import { createProfileAction, updateProfileAction } from '@/lib/actions';
import type { Profile } from '@/types';

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
  profile?: Profile;
}

export default function ProfileForm({ profile }: Props) {
  const action = profile ? updateProfileAction : createProfileAction;

  return (
    <form action={action} className="flex flex-col gap-4">
      {profile && <input type="hidden" name="id" value={profile.id} />}
      {profile && <input type="hidden" name="oldSlug" value={profile.slug} />}

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Nome *</label>
          <input
            name="name"
            type="text"
            required
            defaultValue={profile?.name ?? ''}
            placeholder="Ex: Time de Produto"
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Slug *</label>
          <input
            name="slug"
            type="text"
            defaultValue={profile?.slug ?? ''}
            placeholder="ex: produto (auto a partir do nome)"
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Descrição</label>
        <textarea
          name="description"
          rows={2}
          defaultValue={profile?.description ?? ''}
          placeholder="Uma linha sobre este perfil"
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Avatar</label>
        <input
          name="avatar"
          type="text"
          defaultValue={profile?.avatar ?? ''}
          placeholder="🚀  ou  https://exemplo.com/foto.jpg"
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <SubmitButton label={profile ? 'Salvar alterações' : 'Criar perfil'} />
      </div>
    </form>
  );
}
