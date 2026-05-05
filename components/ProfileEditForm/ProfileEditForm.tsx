'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast, Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { clsx } from 'clsx';
import { useId } from 'react';
import DatePicker from 'react-datepicker';

import { useState } from 'react';
import styles from './ProfileEditForm.module.css';
import 'react-datepicker/dist/react-datepicker.css';
import { User, BabyGender } from '@/types/types';
import { updateUser } from '@/lib/api/clientApi';

interface ProfileEditFormProps {
  user: User;
}

interface UpdateUser {
  name: string;
  gender?: BabyGender;
  dueDate?: string;
  email: string;
}

export default function ProfileEditForm({ user }: ProfileEditFormProps) {
  const oldUser = user;
  const [isDateErr, setIsdateErr] = useState(false);
  const [submitBtn, setSubmitBtn] = useState(true);
  const [nameErr, setNameErr] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const queryClient = useQueryClient();
  const id = useId();
  const today = new Date();
  today.setDate(today.getDate() + 9);
  const maxDueDate = new Date();
  maxDueDate.setDate(maxDueDate.getDate() + 40 * 7);

  const createMutation = useMutation({
    mutationFn: async (data: UpdateUser) => {
      const res = await updateUser(data);
      setSubmitBtn(true);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      toast.success('Дані оновлено');
    },
    onError: () => {
      toast.error('Сталась помилка при збереженні даних');
      setSubmitBtn(false);
      handleReset();
    },
  });

  const formik = useFormik({
    initialValues: {
      name: user.name,
      email: user.email,
      gender: user.gender || 'unknown',
      dueDate: user.dueDate != undefined ? new Date(user.dueDate) : null,
    },
    onSubmit: values => {
      const data: UpdateUser = {
        name: values.name,
        email: values.email,
        gender: values.gender,
      };
      if (values.dueDate) {
        const currDate = values.dueDate.toISOString().slice(0, 10);
        data.dueDate = currDate;
      }
      if (data.name.length < 1 || data.name.length > 32) {
        setNameErr(true);
        return;
      } else {
        setNameErr(false);
      }
      if (!data.email.includes('@')) {
        setEmailError(true);
        return;
      } else {
        setEmailError(false);
      }
      if (isDateErr) {
        return;
      }
      createMutation.mutate(data);
    },
  });

  function validDate(date: Date | null) {
    if (!date) {
      return;
    }
    if (date < today || date > maxDueDate) {
      setIsdateErr(true);
      return false;
    } else {
      setIsdateErr(false);
      return true;
    }
  }

  function handleReset() {
    const oldDate =
      oldUser.dueDate != undefined ? new Date(oldUser.dueDate) : null;
    formik.setFieldValue('name', oldUser.name);
    formik.setFieldValue('email', oldUser.email);
    formik.setFieldValue('dueDate', oldDate);
    formik.setFieldValue('gender', oldUser.gender);
    setSubmitBtn(true);
    setIsdateErr(false);
    setNameErr(false);
    setEmailError(false);
  }

  function handleChangeName(event: React.ChangeEvent) {
    const elem = event.target as HTMLInputElement;
    const size = elem.value.length;
    if (size < 1 || size > 32) {
      setNameErr(true);
    } else {
      setNameErr(false);
    }
  }

  function handleChangeEmail(event: React.ChangeEvent) {
    const elem = event.target as HTMLInputElement;
    const isValid = elem.value.includes('@');
    if (!isValid) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  }

  return (
    <form onSubmit={formik.handleSubmit} className={styles.formBox}>
      <Toaster position="top-right" />

      <div className={styles.inputGroup}>
        <div className={styles.formGroup}>
          <label htmlFor={`${id}-name`} className={styles.label}>
            Ім`я
          </label>
          <input
            type="text"
            id={`${id}-name`}
            name="name"
            value={formik.values.name}
            onChange={data => {
              formik.handleChange(data);
              setSubmitBtn(false);
              handleChangeName(data);
            }}
            className={clsx(styles.input, nameErr && styles.inputError)}
            placeholder="Введіть ім'я"
          />
          {nameErr && (
            <span className={styles.errorMessage}>
              Має бути від 1 до 32 символів
            </span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor={`${id}-email`} className={styles.label}>
            Email
          </label>
          <input
            type="email"
            id={`${id}-email`}
            name="email"
            value={formik.values.email}
            onChange={data => {
              formik.handleChange(data);
              setSubmitBtn(false);
              handleChangeEmail(data);
            }}
            className={`${styles.input} ${emailError ? styles.inputError : ''}`}
            placeholder="Введіть email"
          />
          {emailError && (
            <span className={styles.errorMessage}>Некоректний емейл</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor={`${id}-gender`} className={styles.label}>
            Стать дитини
          </label>
          <select
            id={`${id}-gender`}
            name="gender"
            value={formik.values.gender}
            onChange={data => {
              formik.handleChange(data);
              setSubmitBtn(false);
            }}
            className={clsx(styles.input)}
          >
            <option className={styles.select} value="unknown">
              Не вибрано
            </option>
            <option className={styles.select} value="girl">
              Дівчинка
            </option>
            <option className={styles.select} value="boy">
              Хлопчик
            </option>
          </select>
        </div>

        <div className={clsx(styles.formGroup, styles.dataBox)}>
          <label className={styles.label}>Планова дата пологів</label>
          <DatePicker
            selected={formik.values.dueDate}
            onChange={(date: Date | null) => {
              const isValid = validDate(date);
              setSubmitBtn(false);
              if (isValid) {
                formik.setFieldValue('dueDate', date);
              }
            }}
            wrapperClassName={clsx(styles.input, styles.datepicker)}
            className={clsx(styles.datainput, isDateErr && styles.inputError)}
            dateFormat="dd.MM.yyyy"
            autoComplete="off"
          />
          {isDateErr && (
            <span className={styles.errorMessage}>Некоректна дата</span>
          )}
        </div>
      </div>

      <div className={styles.buttonGroup}>
        <button
          type="button"
          onClick={handleReset}
          className={clsx(styles.btn, styles.btnReset)}
          disabled={createMutation.isPending}
        >
          Відмінити зміни
        </button>
        <button
          type="submit"
          className={clsx(styles.btn, styles.btnSave)}
          disabled={submitBtn}
        >
          {createMutation.isPending ? 'Збереження...' : 'Зберегти зміни'}
        </button>
      </div>
    </form>
  );
}
