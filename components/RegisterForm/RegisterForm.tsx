"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useId } from "react";
import css from "./RegisterForm.module.css";
import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from "formik";
import { register } from '@/lib/api/clientApi';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as Yup from "yup";
import toast from 'react-hot-toast';

const RegisterFormSchema = Yup.object().shape({
  name: Yup.string()
    .required("Обовʼязкове поле"),
  email: Yup.string()
    .email('Некоректна пошта')
    .required("Обовʼязкове поле"),
  password: Yup.string()
    .required("Обовʼязкове поле"),
});

const initialValues: RegisterFormValues = {
  name: "",
  email: "",
  password: "",
};

type RegisterRequest = {
  name: string;
  email: string;
  password: string;
};

type RegisterFormValues = RegisterRequest;

export default function RegisterForm() {
  const router = useRouter();
  const fieldId = useId();


const registerMutation = useMutation<
  AuthResponse,
  Error,
  RegisterRequest
>({
  mutationFn: register,
});

  const queryClient = useQueryClient();

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

          onSubmit={(
  values: RegisterFormValues,
  { setSubmitting, resetForm, setErrors }: FormikHelpers<RegisterFormValues>
) => {
            registerMutation.mutate(values, {
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['me'] });
      resetForm();
      router.push('/');
    },
    onError: (error: Error) => {
      toast.error(error.message);
      setErrors({
        password: "Користувач з такою поштою вже існує",
      });
    },
    onSettled: () => setSubmitting(false),
  });
}}
    >
          {({ isSubmitting, errors, touched }) => (
            <Form className={css.form}>
              <h1 className={css.title}>Реєстрація</h1>
              <label htmlFor={`${fieldId}-name`} className={css.label}>Імʼя*</label>
                <Field
                id={`${fieldId}-name`}
                type="text" name="name"
                className={`${css.input} ${errors.name && touched.name ? css.inputError : ''}`}
                placeholder="Ваше імʼя" />
              <ErrorMessage name="name" className={css.error} component="span" />
              <label htmlFor={`${fieldId}-email`} className={css.label}>Пошта*</label>
              <Field
                id={`${fieldId}-email`}
                type="email" name="email"
                className={`${css.input} ${errors.email && touched.email ? css.inputError : ''}`}
                placeholder="hello@leleka.com"
                autoComplete="email"
              />
              <ErrorMessage name="email" className={css.error} component="span" />
              <label htmlFor={`${fieldId}-password`} className={css.label}>Пароль*</label>
              <Field
                id={`${fieldId}-password`}
                type="password"
                name="password"
                className={`${css.input} ${errors.password && touched.password ? css.inputError : ''}`}
                placeholder="********"
                autoComplete="new-password"
              />
              <ErrorMessage name="password" className={css.error} component="span" />
              <button type="submit"
                disabled={registerMutation.isPending || isSubmitting}
                 className={css.btn}>
                {registerMutation.isPending ? 'Завантаження...' : 'Зареєструватись'}
              </button>

              <p className={css.register}>
                Вже маєте аккаунт? <span><Link href='/auth/login'>Увійти</Link></span>
              </p>
            </Form>
          )}
        </Formik>
        </div>
    </div>
  );
}
