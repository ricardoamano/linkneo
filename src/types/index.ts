export interface Profile {
  id: number;
  slug: string;
  name: string;
  description: string | null;
  avatar: string | null;
  created_at: string;
}

export interface Link {
  id: number;
  profile_id: number;
  title: string;
  url: string;
  icon: string | null;
  sort_order: number;
  created_at: string;
}

export interface ProfileWithLinks extends Profile {
  links: Link[];
}
