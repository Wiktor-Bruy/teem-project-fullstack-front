'use client';
import UserBar from '../UserBar/UserBar';
import AuthBar from '../AuthBar/AuthBar';

import { useEffect, useState } from 'react';
import css from './Sidebar.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useAuthStore } from '@/lib/store/authStore';

export default function SideBar() {
  const { user } = useAuthStore();
  const isAuth = Boolean(user);

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1440);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <aside className={`${css.sidebar} ${isDesktop ? css.open : ''}`}>
      <div className={css.inner}>
        <div className={css.header}>
          <Link href="/" className={css.logoWrap}>
            <svg width="32" height="32">
              <use href="/icons.svg#logo" />
            </svg>
            <span className={css.logoText}>Лелека</span>
          </Link>
        </div>

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

        <div className={css.footer}>
          {!isAuth ? (
            <div className={css.authLinks}>
              <Link href="/register" className={css.linkSingup}>
                Зареєструватися
              </Link>
              <Link href="/login" className={css.linkSingin}>
                Увійти
              </Link>
            </div>
          ) : (
            <div className={css.userBlock}>
              <Image
                src={user.avatar}
                alt="avatar"
                width={40}
                height={40}
                className={css.avatar}
              />
              <div className={css.userText}>
                <p>{user.name}</p>
                <p>{user.email}</p>
              </div>
              <button className={css.logoutBtn}>
                <svg width="24" height="24">
                  <use href="/icons.svg#logout" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
