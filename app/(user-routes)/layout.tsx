import css from './layout.module.css';

import clsx from 'clsx';

import Sidebar from '@/components/Sidebar/Sidebar';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import Header from '@/components/Header/Header';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <div className={clsx(css.box, 'container')}>
        <div className={css.sidebar}>
          <Sidebar />
        </div>
        <div>
          <Header />
          <Breadcrumbs />
          <div>{children}</div>
        </div>
      </div>
    </main>
  );
}