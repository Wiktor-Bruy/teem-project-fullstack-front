"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useId } from "react";
import css from "./LoginForm.module.css";
import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from "formik";
import { login } from '@/lib/api/clientApi';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as Yup from "yup";
import toast from 'react-hot-toast';

const LoginFormSchema = Yup.object().shape({
  email: Yup.string()
    .email('Некоректна пошта')
    .required("Обовʼязкове поле"),
  password: Yup.string()
    .required("Обовʼязкове поле"),
});

interface LoginFormValues {
        email: string;
        password: string;
}

const initialValues: LoginFormValues = {
            email: "",
            password: "",
};


export default function LoginForm() {
  const router = useRouter();
  const fieldId = useId();


const loginMutation = useMutation({
  mutationFn: (values: LoginFormValues) => login(values),
});

  const queryClient = useQueryClient();

  return (
    <div className={css.loginPage}>

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
          validationSchema={LoginFormSchema}

          onSubmit={(
  values: LoginFormValues,
  { setSubmitting, resetForm, setErrors }: FormikHelpers<LoginFormValues>
) => {
            loginMutation.mutate(values, {
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['me'] });
      resetForm();
      router.push('/');
    },
    onError: (error: Error) => {
      toast.error(error.message);
      setErrors({
        password: "Невірний email або пароль",
      });
    },
    onSettled: () => setSubmitting(false),
  });
}}
    >
          {({ isSubmitting, errors, touched }) => (
            <Form className={css.form}>
              <h1 className={css.title}>Вхід</h1>
              <Field
                id={`${fieldId}-email`}
                type="email" name="email"
                className={`${css.input} ${errors.email && touched.email ? css.inputError : ''}`}
                placeholder="Пошта" />
              <ErrorMessage name="email" className={css.error} component="span" />
              <Field
                id={`${fieldId}-password`}
                type="password"
                name="password"
                className={`${css.input} ${errors.password && touched.password ? css.inputError : ''}`}
                placeholder="Пароль" />
              <ErrorMessage name="password" className={css.error} component="span" />
              <button type="submit"
                disabled={loginMutation.isPending || isSubmitting}
                 className={css.btn}>
                {loginMutation.isPending ? 'Завантаження...' : 'Увійти'}
              </button>

              <p className={css.register}>
                Немає акаунту? <span><Link href='/auth/register'>Зареєструватися</Link></span>
              </p>
            </Form>
          )}
        </Formik>
        </div>
    </div>
  );
}
