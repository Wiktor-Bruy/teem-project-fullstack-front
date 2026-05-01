import css from './page.module.css';

import clsx from 'clsx';
import Image from 'next/image';

import { OnboardingForm } from '@/components/OnboardingForm/OnboardingForm';

export default function Onboarding() {
  return (
    <main>
      <div className={clsx(css.box, 'container')}>
        <div className={css.formBox}>
          <OnboardingForm />
        </div>
        <div className={css.imageBox}>
          <Image
            src="/image/user.png"
            alt="onbording image"
            className={css.image}
            width={720}
            height={900}
          />
        </div>
      </div>
    </main>
  );
}
