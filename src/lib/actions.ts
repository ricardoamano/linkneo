'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { put } from '@vercel/blob';
import * as db from './db';

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-');
}

async function resolveAvatar(formData: FormData): Promise<string | null> {
  const file = formData.get('avatar_file') as File | null;

  if (file && file.size > 0) {
    const ext = file.name.split('.').pop() ?? 'jpg';
    const filename = `avatars/${Date.now()}.${ext}`;
    const blob = await put(filename, file, { access: 'public' });
    return blob.url;
  }

  return (formData.get('avatar') as string)?.trim() || null;
}

// ─── Profile Actions ────────────────────────────────────────────────────────

export async function createProfileAction(formData: FormData): Promise<void> {
  const name = (formData.get('name') as string).trim();
  const rawSlug = (formData.get('slug') as string).trim();
  const description = (formData.get('description') as string)?.trim() || null;
  const bg_color = (formData.get('bg_color') as string)?.trim() || null;
  const slug = slugify(rawSlug || name);
  const avatar = await resolveAvatar(formData);

  await db.createProfile({ slug, name, description, avatar, bg_color });

  revalidatePath('/');
  revalidatePath('/admin');
  redirect(`/admin/${slug}`);
}

export async function updateProfileAction(formData: FormData): Promise<void> {
  const id = Number(formData.get('id'));
  const oldSlug = formData.get('oldSlug') as string;
  const name = (formData.get('name') as string).trim();
  const rawSlug = (formData.get('slug') as string).trim();
  const description = (formData.get('description') as string)?.trim() || null;
  const bg_color = (formData.get('bg_color') as string)?.trim() || null;
  const slug = slugify(rawSlug || name);
  const avatar = await resolveAvatar(formData);

  await db.updateProfile(id, { slug, name, description, avatar, bg_color });

  revalidatePath('/');
  revalidatePath('/admin');
  revalidatePath(`/${oldSlug}`);
  revalidatePath(`/${slug}`);
  revalidatePath(`/admin/${oldSlug}`);
  revalidatePath(`/admin/${slug}`);
  redirect(`/admin/${slug}`);
}

export async function deleteProfileAction(formData: FormData): Promise<void> {
  const id = Number(formData.get('id'));
  const slug = formData.get('slug') as string;

  await db.deleteProfile(id);

  revalidatePath('/');
  revalidatePath('/admin');
  revalidatePath(`/${slug}`);
  redirect('/admin');
}

// ─── Link Actions ────────────────────────────────────────────────────────────

export async function createLinkAction(formData: FormData): Promise<void> {
  const profile_id = Number(formData.get('profile_id'));
  const profileSlug = formData.get('profileSlug') as string;
  const title = (formData.get('title') as string).trim();
  const url = (formData.get('url') as string).trim();
  const icon = (formData.get('icon') as string)?.trim() || null;

  await db.createLink({ profile_id, title, url, icon });

  revalidatePath(`/${profileSlug}`);
  revalidatePath(`/admin/${profileSlug}`);
  redirect(`/admin/${profileSlug}`);
}

export async function updateLinkAction(formData: FormData): Promise<void> {
  const id = Number(formData.get('id'));
  const profileSlug = formData.get('profileSlug') as string;
  const title = (formData.get('title') as string).trim();
  const url = (formData.get('url') as string).trim();
  const icon = (formData.get('icon') as string)?.trim() || null;

  await db.updateLink(id, { title, url, icon });

  revalidatePath(`/${profileSlug}`);
  revalidatePath(`/admin/${profileSlug}`);
  redirect(`/admin/${profileSlug}`);
}

export async function deleteLinkAction(formData: FormData): Promise<void> {
  const id = Number(formData.get('id'));
  const profileSlug = formData.get('profileSlug') as string;

  await db.deleteLink(id);

  revalidatePath(`/${profileSlug}`);
  revalidatePath(`/admin/${profileSlug}`);
  redirect(`/admin/${profileSlug}`);
}

export async function reorderLinksAction(formData: FormData): Promise<void> {
  const profileId = Number(formData.get('profileId'));
  const profileSlug = formData.get('profileSlug') as string;
  const orderedIds = JSON.parse(formData.get('orderedIds') as string) as number[];

  await db.reorderLinks(profileId, orderedIds);

  revalidatePath(`/${profileSlug}`);
  revalidatePath(`/admin/${profileSlug}`);
  redirect(`/admin/${profileSlug}`);
}
