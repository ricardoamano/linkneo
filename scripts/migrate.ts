import { neon } from '@neondatabase/serverless';

async function migrate() {
  const sql = neon(process.env.DATABASE_URL!);

  await sql`
    CREATE TABLE IF NOT EXISTS profiles (
      id          SERIAL PRIMARY KEY,
      slug        TEXT NOT NULL UNIQUE,
      name        TEXT NOT NULL,
      description TEXT,
      avatar      TEXT,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS links (
      id          SERIAL PRIMARY KEY,
      profile_id  INTEGER NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
      title       TEXT NOT NULL,
      url         TEXT NOT NULL,
      icon        TEXT,
      sort_order  INTEGER NOT NULL DEFAULT 0,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await sql`CREATE INDEX IF NOT EXISTS links_profile_id_idx ON links(profile_id)`;
  await sql`CREATE INDEX IF NOT EXISTS profiles_slug_idx ON profiles(slug)`;

  console.log('Migration completed successfully.');
}

migrate().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
