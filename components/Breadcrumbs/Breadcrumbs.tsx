'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Breadcrumbs.module.css';

const LABELS: Record<string, string> = {
  'journey': 'Подорож',
  'diary':   'Щоденник',
  'profile': 'Профіль',
};

const HIDDEN_PREFIXES = ['/auth'];

interface Props {
  lastLabel?: string;
}

export default function Breadcrumb({ lastLabel }: Props) {
  const pathname = usePathname();

  if (HIDDEN_PREFIXES.some(prefix => pathname.startsWith(prefix))) return null;

  const segments = pathname.split('/').filter(Boolean);

  const crumbs = [
    { label: 'Мій день', path: '/', isLast: segments.length === 0 },
    ...segments.map((seg, i) => ({
      label: i === segments.length - 1
        ? (lastLabel ?? LABELS[seg] ?? seg)
        : (LABELS[seg] ?? seg),
      path: '/' + segments.slice(0, i + 1).join('/'),
      isLast: i === segments.length - 1,
    })),
  ];

  return (
    <nav className={styles.breadcrumb} aria-label="Навігація">
      {crumbs.map((c, i) => (
        <span key={c.path} className={styles.item}>
          {i > 0 && (
            <svg className={styles.svg} width="12" height="12">
              <use href="/icons.svg#arrow-right" />
            </svg>
          )}
          {c.isLast
            ? <span className={styles.current} aria-current="page">{c.label}</span>
            : <Link href={c.path} className={styles.link}>{c.label}</Link>
          }
        </span>
      ))}
    </nav>
  );
}