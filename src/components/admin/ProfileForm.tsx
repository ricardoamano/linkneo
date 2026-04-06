'use client';

import { useFormStatus } from 'react-dom';
import { useRef, useState } from 'react';
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
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(
    profile?.avatar?.startsWith('http') ? profile.avatar : null
  );

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
  }

  function handleRemove() {
    setPreview(null);
    if (fileRef.current) fileRef.current.value = '';
  }

  return (
    <form action={action} className="flex flex-col gap-4">
      {profile && <input type="hidden" name="id" value={profile.id} />}
      {profile && <input type="hidden" name="oldSlug" value={profile.slug} />}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            placeholder="ex: produto"
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

      {/* Avatar */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">Avatar</label>

        {/* Photo upload */}
        <div className="flex items-center gap-4">
          {preview ? (
            <div className="relative flex-shrink-0">
              <img
                src={preview}
                alt="Preview"
                className="w-16 h-16 rounded-full object-cover border border-gray-200"
              />
              <button
                type="button"
                onClick={handleRemove}
                className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center hover:bg-red-600"
              >
                ×
              </button>
            </div>
          ) : (
            <div className="w-16 h-16 rounded-full bg-gray-100 border border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-2xl flex-shrink-0">
              {profile?.avatar && !profile.avatar.startsWith('http')
                ? profile.avatar
                : '👤'}
            </div>
          )}

          <div className="flex flex-col gap-2 flex-1">
            <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors w-fit">
              📷 Escolher foto
              <input
                ref={fileRef}
                name="avatar_file"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFile}
              />
            </label>
            <p className="text-xs text-gray-400">ou use um emoji / URL abaixo</p>
          </div>
        </div>

        {/* Emoji / URL fallback */}
        <input
          name="avatar"
          type="text"
          defaultValue={
            profile?.avatar && !profile.avatar.startsWith('http') ? profile.avatar : ''
          }
          placeholder="🚀  ou  https://exemplo.com/foto.jpg"
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <p className="text-xs text-gray-400 -mt-1">
          A foto enviada tem prioridade sobre o campo acima.
        </p>
      </div>

      {/* Background color */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Cor de fundo da página</label>
        <div className="flex items-center gap-3">
          <input
            name="bg_color"
            type="color"
            defaultValue={profile?.bg_color ?? '#7c3aed'}
            className="w-10 h-10 rounded-lg border border-gray-300 cursor-pointer p-0.5"
          />
          <span className="text-xs text-gray-400">Clique para escolher a cor</span>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <SubmitButton label={profile ? 'Salvar alterações' : 'Criar perfil'} />
      </div>
    </form>
  );
}
