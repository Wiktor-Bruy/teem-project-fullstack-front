'use client';

import UserBar from '../UserBar/UserBar';
import AuthBar from '../AuthBar/AuthBar';

import css from './Sidebar.module.css';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store/authStore';

export default function SideBar() {
  const { user } = useAuthStore();
  const isAuth = Boolean(user);

  return (
    <aside className={css.sidebar}>
      <div className={css.inner}>
        <Link href="/" className={css.logoWrap}>
          <svg width="32" height="32">
            <use href="/icons.svg#logo" />
          </svg>
          <span className={css.logoText}>Лелека</span>
        </Link>

        <nav className={css.nav}>
          <ul className={css.navList}>
            <li>
              <Link href="/" className={`${css.navLink} ${css.active}`}>
                <svg width="24" height="24">
                  <use href="/icons.svg#me-day" />
                </svg>
                <span>Мій день</span>
              </Link>
            </li>

            <li>
              <Link href="/journey/1" className={css.navLink}>
                <svg width="24" height="24">
                  <use href="/icons.svg#journey" />
                </svg>
                <span>Подорож</span>
              </Link>
            </li>

            <li>
              <Link href="/diary" className={css.navLink}>
                <svg width="24" height="24">
                  <use href="/icons.svg#diary" />
                </svg>
                <span>Щоденник</span>
              </Link>
            </li>

            <li>
              <Link href="/profile" className={css.navLink}>
                <svg width="24" height="24">
                  <use href="/icons.svg#profile" />
                </svg>
                <span>Профіль</span>
              </Link>
            </li>
          </ul>
        </nav>

        <div className={css.divider} />

        <div className={css.footer}>{isAuth ? <UserBar /> : <AuthBar />}</div>
      </div>
    </aside>
  );
}
