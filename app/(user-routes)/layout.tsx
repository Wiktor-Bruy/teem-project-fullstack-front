import css from './layout.module.css';
import clsx from 'clsx';
import AuthProvider from '@/components/AuthProvider/AuthProvider';
import Sidebar from '@/components/Sidebar/Sidebar';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import Header from '@/components/Header/Header';
import AuthBar from '@/components/AuthBar/AuthBar';
import UserBar from '@/components/UserBar/UserBar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAuth = true; 

  return (
    <AuthProvider>
      <div className={css.layoutWrapper}>
        
        <aside className={css.sidebarSide}>
          <div className={css.sidebarContainer}>
            <div className={css.menuSection}>
              <Sidebar />
            </div>
            
            <div className={css.bottomBars}>
            </div>
          </div>
        </aside>

        <main className={css.mainContent}>
          <Header />
          <div className={css.pageContainer}>
            <Breadcrumbs />
            <div className={css.childrenBox}>
              {children}
            </div>
          </div>
        </main>

      </div>
    </AuthProvider>
  );
}
