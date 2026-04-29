"use client";

import Link from "next/link";
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { useId } from "react";
import css from "./AuthNavigation.module.css";
import { useAuthStore } from "@/lib/store/authStore";
import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from "formik";
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
    mutationFn: async (values: LoginFormValues) => {
      const res = await fetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Помилка логіну');
      }
      return data;
    },
  });

  return (
    <main className="login-page">
      <div className="login-left">
        <div className="logo">Лелека</div>

        <h1 className="title">Вхід</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={LoginFormSchema}
          onSubmit={(
  values: LoginFormValues,
  { setSubmitting, resetForm, setErrors }: FormikHelpers<LoginFormValues>
) => {
  loginMutation.mutate(values, {
    onSuccess: () => {
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
          {({ isSubmitting }) => (
            <Form>
              <label htmlFor={`${fieldId}-email`}>Пошта</label>
              <Field id={`${fieldId}-email`} type="email" name="email" className={css.input} />
              <ErrorMessage name="email" className={css.error} component="span" />
              <label htmlFor={`${fieldId}-password`}>Пароль</label>
              <Field id={`${fieldId}-password`} type="password" name="password" className={css.input} />
              <ErrorMessage name="password" className={css.error} component="span" />
              <button type="submit"
                disabled={loginMutation.isPending || isSubmitting}
                className="btn">
                {loginMutation.isPending ? 'Завантаження...' : 'Увійти'}
              </button>

              <p className="register">
                Немає акаунту? <Link href='/auth/register'>Зареєструватися</Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
      <div className="login-right">
        <Image src="/image/login.png" alt="eggs" fill />
      </div>
    </main>
  );
}
