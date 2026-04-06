import { neon } from '@neondatabase/serverless';
import type { Profile, Link, ProfileWithLinks } from '@/types';

function sql() {
  const db = neon(process.env.DATABASE_URL!);
  return db;
}

export async function getAllProfiles(): Promise<Profile[]> {
  const db = sql();
  const rows = await db`SELECT * FROM profiles ORDER BY created_at DESC`;
  return rows as Profile[];
}

export async function getProfileBySlug(slug: string): Promise<ProfileWithLinks | null> {
  const db = sql();
  const rows = await db`
    SELECT
      p.id, p.slug, p.name, p.description, p.avatar, p.bg_color, p.created_at,
      l.id AS link_id, l.title, l.url, l.icon, l.sort_order, l.profile_id, l.created_at AS link_created_at
    FROM profiles p
    LEFT JOIN links l ON l.profile_id = p.id
    WHERE p.slug = ${slug}
    ORDER BY l.sort_order ASC, l.created_at ASC
  `;

  if (rows.length === 0) return null;

  const first = rows[0];
  const profile: ProfileWithLinks = {
    id: first.id,
    slug: first.slug,
    name: first.name,
    description: first.description,
    avatar: first.avatar,
    bg_color: first.bg_color,
    created_at: first.created_at,
    links: [],
  };

  for (const row of rows) {
    if (row.link_id !== null) {
      profile.links.push({
        id: row.link_id,
        profile_id: row.profile_id,
        title: row.title,
        url: row.url,
        icon: row.icon,
        sort_order: row.sort_order,
        created_at: row.link_created_at,
      });
    }
  }

  return profile;
}

export async function createProfile(data: {
  slug: string;
  name: string;
  description: string | null;
  avatar: string | null;
  bg_color: string | null;
}): Promise<Profile> {
  const db = sql();
  const rows = await db`
    INSERT INTO profiles (slug, name, description, avatar, bg_color)
    VALUES (${data.slug}, ${data.name}, ${data.description}, ${data.avatar}, ${data.bg_color})
    RETURNING *
  `;
  return rows[0] as Profile;
}

export async function updateProfile(
  id: number,
  data: { slug: string; name: string; description: string | null; avatar: string | null; bg_color: string | null }
): Promise<Profile> {
  const db = sql();
  const rows = await db`
    UPDATE profiles
    SET slug = ${data.slug}, name = ${data.name}, description = ${data.description}, avatar = ${data.avatar}, bg_color = ${data.bg_color}
    WHERE id = ${id}
    RETURNING *
  `;
  return rows[0] as Profile;
}

export async function deleteProfile(id: number): Promise<void> {
  const db = sql();
  await db`DELETE FROM profiles WHERE id = ${id}`;
}

export async function createLink(data: {
  profile_id: number;
  title: string;
  url: string;
  icon: string | null;
}): Promise<Link> {
  const db = sql();
  const maxRows = await db`
    SELECT COALESCE(MAX(sort_order), -1) AS max_order
    FROM links WHERE profile_id = ${data.profile_id}
  `;
  const nextOrder = (maxRows[0].max_order as number) + 1;

  const rows = await db`
    INSERT INTO links (profile_id, title, url, icon, sort_order)
    VALUES (${data.profile_id}, ${data.title}, ${data.url}, ${data.icon}, ${nextOrder})
    RETURNING *
  `;
  return rows[0] as Link;
}

export async function updateLink(
  id: number,
  data: { title: string; url: string; icon: string | null }
): Promise<Link> {
  const db = sql();
  const rows = await db`
    UPDATE links SET title = ${data.title}, url = ${data.url}, icon = ${data.icon}
    WHERE id = ${id}
    RETURNING *
  `;
  return rows[0] as Link;
}

export async function deleteLink(id: number): Promise<void> {
  const db = sql();
  await db`DELETE FROM links WHERE id = ${id}`;
}

export async function reorderLinks(profileId: number, orderedIds: number[]): Promise<void> {
  const db = sql();
  await Promise.all(
    orderedIds.map((id, index) =>
      db`UPDATE links SET sort_order = ${index} WHERE id = ${id} AND profile_id = ${profileId}`
    )
  );
}
