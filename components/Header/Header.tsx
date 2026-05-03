'use client';

import css from './Header.module.css';
import Link from 'next/link';
import { useState } from 'react';

import Modal from '../Modal/Modal';
import Sidebar from '../Sidebar/Sidebar';

export default function Header() {
  const [isModalNavigationOpen, setIsModalNavigationOpen] = useState(false);

  const openModalNavigation = () => {
    setIsModalNavigationOpen(true);
  };

  const closeModalNavigation = () => {
    setIsModalNavigationOpen(false);
  };

  return (
    <>
      <header className={css.header}>
        <div className={css.header_container}>
          <div className={css.logo_container}>
            <Link href="/" aria-label="Home" className={css.logo_link}>
              <svg width="24" height="24">
                <use href="/icons.svg#logo" />
              </svg>
              <svg width="49" height="11">
                <use href="/icons.svg#icon-leleka" />
              </svg>
            </Link>
          </div>

          <div className={css.menu_container}>
            <button className={css.menu_button} onClick={openModalNavigation}>
              <svg width="22" height="16">
                <use href="/icons.svg#menu" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {isModalNavigationOpen && (
        <Modal onClose={closeModalNavigation}>
          <Sidebar />
        </Modal>
      )}
    </>
  );
}
