import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Сторінку не знайдено',
  description: 'Запитувана сторінка не існує.',
};

export default function NotFoundPage() {
  return (
    <div style={{ textAlign: 'center', padding: '40px' }}>
      <h1 style={{ fontSize: '48px', marginBottom: '16px' }}>
        404 - Сторінку не знайдено
      </h1>

      <p style={{ marginBottom: '20px' }}>
        На жаль, сторінка, яку ви шукаєте, не існує.
      </p>

      <Link href="/">Повернутись на головну</Link>
    </div>
  );
}
