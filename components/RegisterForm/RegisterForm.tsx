'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import css from './RegisterForm.module.css';
import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from 'formik';
import { register } from '@/lib/api/clientApi';
import { isAxiosError } from 'axios';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/lib/store/authStore';
import type { RegisterRequest, User } from '@/types/types';

const RegisterFormSchema = Yup.object().shape({
  name: Yup.string().required('Обовʼязкове поле'),
  email: Yup.string().email('Некоректна пошта').required('Обовʼязкове поле'),
  password: Yup.string().required('Обовʼязкове поле'),
});

const initialValues: RegisterFormValues = {
  name: '',
  email: '',
  password: '',
};

type RegisterFormValues = RegisterRequest;

export default function RegisterForm() {
  const router = useRouter();
  const setUser = useAuthStore(state => state.setUser);

  return (
    <div className={css.page}>
      <div className={css.logo}>
        <svg className={css.logoIcon} width={30} height={30}>
          <use href="/icons.svg#logo" />
        </svg>
        <svg className={css.logoLeleka} width={60} height={13}>
          <use href="/icons.svg#icon-leleka" />
        </svg>
      </div>
      <div className={css.center}>
        <Formik
          initialValues={initialValues}
          validationSchema={RegisterFormSchema}
          onSubmit={async (
            values: RegisterFormValues,
            {
              setSubmitting,
              resetForm,
              setErrors,
            }: FormikHelpers<RegisterFormValues>
          ) => {
            console.log('Form submitted with values:', values);
            try {
              console.log('Calling register function...');
              const user: User = await register(values);
              console.log('Registration successful:', user);

              setUser(user);
              resetForm();
              router.push('/edit');
            } catch (error: unknown) {
              console.error('Registration error:', error);
              if (isAxiosError(error)) {
                const errorMessage = error.response?.data?.message || 'Помилка реєстрації';
                console.error('Axios error:', errorMessage);
                toast.error(errorMessage);

                if (errorMessage.toLowerCase().includes('email') || errorMessage.toLowerCase().includes('існує')) {
                  setErrors({
                    email: errorMessage,
                  });
                }
              } else {
                toast.error('Щось пішло не так');
              }
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className={css.form}>
              <h1 className={css.title}>Реєстрація</h1>

              <label htmlFor={`register-name`} className={css.label}>
                Імʼя*
              </label>
              <div className={css.fieldWrapper}>
                <Field
                  id={`register-name`}
                  type="text"
                  name="name"
                  className={`${css.input} ${errors.name && touched.name ? css.inputError : ''}`}
                  placeholder="Ваше імʼя"
                />
                <ErrorMessage
                  name="name"
                  className={css.error}
                  component="span"
                />
              </div>
              <label htmlFor={`register-email`} className={css.label}>
                Пошта*
              </label>
              <div className={css.fieldWrapper}>
                <Field
                  id={`register-email`}
                  type="email"
                  name="email"
                  className={`${css.input} ${errors.email && touched.email ? css.inputError : ''}`}
                  placeholder="hello@leleka.com"
                  autoComplete="email"
                />
                <ErrorMessage
                  name="email"
                  className={css.error}
                  component="span"
                />
              </div>
              <label htmlFor={`register-password`} className={css.label}>
                Пароль*
              </label>
              <div className={css.fieldWrapper}>
                <Field
                  id={`register-password`}
                  type="password"
                  name="password"
                  className={`${css.input} ${errors.password && touched.password ? css.inputError : ''}`}
                  placeholder="********"
                  autoComplete="new-password"
                />
                <ErrorMessage
                  name="password"
                  className={css.error}
                  component="span"
                />
              </div>
              <button type="submit" disabled={isSubmitting} className={css.btn}>
                {isSubmitting ? 'Завантаження...' : 'Зареєструватись'}
              </button>

              <p className={css.register}>
                Вже маєте аккаунт?{' '}
                <span>
                  <Link href="/login">Увійти</Link>
                </span>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
