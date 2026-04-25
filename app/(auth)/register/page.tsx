import css from './page.module.css';

import clsx from 'clsx';
import Image from 'next/image';

import RegisterForm from '@/components/RegisterForm/RegisterForm';

export default function Regisrewter() {
  return (
    <main>
      <div className={clsx(css.box, 'container')}>
        <div className={css.formBox}>
          <RegisterForm />
        </div>
        <div className={css.imageBox}>
          <Image
            src="/image/register.png"
            alt="logih image"
            width={720}
            height={900}
            // style={{
            //   maxWidth: '100%',
            //   height: '100%',
            //   objectFit: 'cover',
            //   position: 'absolute',
            //   right: '0',
            // }}
          />
        </div>
      </div>
    </main>
  );
}
