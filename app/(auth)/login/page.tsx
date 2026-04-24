import css from './page.module.css';

import Image from 'next/image';
import LoginForm from '@/components/LoginForm/LoginFofm';

export default function Login() {
  return (
    <main className={css.page}>
      <div className={css.container}>
        <div className={css.formBox}>
          <LoginForm />
        </div>
        <div className={css.imageBox}>
          <Image
            src="/image/login.png"
            alt="logih image"
            width={500}
            height={500}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </div>
    </main>
  );
}
