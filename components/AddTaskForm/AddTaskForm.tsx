'use client';

import css from './AddTaskForm.module.css';

import { Field, Formik, Form, ErrorMessage, FormikHelpers } from 'formik';
import { useId } from 'react';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { Task } from '@/types/types';
import { createTask } from '@/lib/api/clientApi';

interface AddTaskFormProps {
  onClose: () => void;
}

const today = new Date(Date.now()).toISOString().slice(0, 10);

const initValue: Task = {
  title: '',
  date: today,
};

export default function AddTaskForm({ onClose }: AddTaskFormProps) {
  const task = useId();
  const date = useId();
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async (data: Task) => {
      const res = await createTask(data);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      onClose();
    },
  });

  function handleSubmit(values: Task, action: FormikHelpers<Task>) {
    createMutation.mutate(values);
    action.resetForm();
  }

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .min(1, 'Має бути хоча б 1 символ.')
      .max(96, 'Максимально 96 символів.')
      .required('Це поле обов`язкове'),
    date: Yup.date()
      .min(today, 'Ви вказали дату, що пройшла.')
      .required('Це поле обов`язкове'),
  });

  return (
    <>
      <Formik
        validationSchema={validationSchema}
        initialValues={initValue}
        onSubmit={handleSubmit}
      >
        <Form className={css.taskForm}>
          <div className={css.formGroup}>
            <label htmlFor={task}>Назва завдання</label>
            <Field
              className={css.input}
              type="text"
              name="title"
              id={task}
              placeholder="Прийняти вітаміни"
            />
            <ErrorMessage name="title" component="span" />
          </div>
          <div className={css.formGroup}>
            <label htmlFor={date}>Дата</label>
            <Field className={css.input} type="date" name="date" id={date} />
            <ErrorMessage name="date" component="span" />
          </div>
          <button className={css.btn} type="submit">
            Зберегти
          </button>
        </Form>
      </Formik>
    </>
  );
}
