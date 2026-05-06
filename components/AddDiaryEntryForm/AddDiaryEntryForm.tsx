'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useEffect, useMemo, useState } from 'react';
import Select from 'react-select';
import toast from 'react-hot-toast';
import styles from './AddDiaryEntryForm.module.css';
import { createNote, updateNote, getEmotions } from '@/lib/api/clientApi';

type Emotion = {
  _id: string;
  title: string;
};

export type InitialData = {
  _id: string;
  title: string;
  text: string;
  emotions: { _id: string }[] | string[];
};

type AddDiaryEntryFormProps = {
  onSuccess: () => void;
  initialData?: InitialData;
};

export type FormValues = {
  title: string;
  text: string;
  emotions: string[];
};

const schema = Yup.object({
  title: Yup.string().required('Введіть заголовок'),
  text: Yup.string().required('Введіть текст'),
  emotions: Yup.array()
    .of(Yup.string().required())
    .min(1, 'Оберіть емоцію')
    .required('Оберіть емоцію'),
});

export default function AddDiaryEntryForm({
  onSuccess,
  initialData,
}: AddDiaryEntryFormProps) {
  const [emotions, setEmotions] = useState<Emotion[]>([]);

useEffect(() => {
  const fetchEmotions = async () => {
    try {
      const data = await getEmotions();
      setEmotions(data?.emotions || []);
    } catch (err) {
      console.error(err);
      setEmotions([]);
    }
  };

  fetchEmotions();
}, []);


  const emotionOptions = useMemo(() => {
    return emotions.map(e => ({
      value: e._id,
      label: e.title,
    }));
  }, [emotions]);

  const initialEmotions = useMemo(() => {
    if (!initialData?.emotions) return [];

    return initialData.emotions.map(e =>
      typeof e === 'string' ? e : e._id
    );
  }, [initialData]);

  return (
    <Formik<FormValues>
      enableReinitialize
      initialValues={{
        title: initialData?.title || '',
        text: initialData?.text || '',
        emotions: initialEmotions,
      }}
      validationSchema={schema}
      onSubmit={async (values, { setSubmitting }) => {
  try {
    const payload = {
      title: values.title,
      description: values.text,
      emotions: values.emotions,
    };

    if (initialData?._id) {
      await updateNote(initialData._id, payload);
    } else {
      await createNote(payload);
    }

    toast.success(initialData ? 'Оновлено' : 'Створено');
    onSuccess();
  } catch (e) {
    toast.error('Помилка при збереженні запису');
  } finally {
    setSubmitting(false);
  }
}}
    >
      {({ values, setFieldValue, isSubmitting }) => (
        <Form className={styles.form}>
          {/* Заголовок */}
          <label htmlFor="title">Заголовок</label>
          <Field
            id="title"
            name="title"
            placeholder="Введіть заголовок"
            className={styles.input}
          />
          <ErrorMessage name="title" component="div" className={styles.error} />

          {/* Емоції */}
          <label>Категорії</label>
          <Select
            isMulti
            className={styles.input}
            options={emotionOptions}
            value={emotionOptions.filter(o =>
              values.emotions.includes(o.value)
            )}
            onChange={(selected: readonly { value: string; label: string }[] | null) => {
              setFieldValue(
                'emotions',
                selected ? selected.map(s => s.value) : []
              );
            }}
            placeholder="Оберіть емоції"
          />
          <ErrorMessage
            name="emotions"
            component="div"
            className={styles.error}
          />

          {/* Текст */}
          <label htmlFor="text">Запис</label>
          <Field
            as="textarea"
            id="text"
            name="text"
            placeholder="Як ви себе відчуваєте?"
            className={styles.textarea}
          />
          <ErrorMessage name="text" component="div" className={styles.error} />

          {/* Кнопка */}
          <button type="submit" disabled={isSubmitting} className={styles.btn}>
            {isSubmitting
              ? 'Збереження...'
              : initialData
              ? 'Оновити'
              : 'Зберегти'}
          </button>
        </Form>
      )}
    </Formik>
  );
}
