import type { Link } from '@/types';

interface Props {
  link: Link;
}

export default function LinkButton({ link }: Props) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full flex items-center justify-center gap-2 px-6 py-3
                 bg-white/20 hover:bg-white/30 text-white font-semibold
                 rounded-full transition-colors backdrop-blur-sm border border-white/30"
    >
      {link.icon && <span className="text-lg leading-none">{link.icon}</span>}
      {link.title}
    </a>
  );
}
