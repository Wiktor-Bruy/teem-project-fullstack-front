"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import toast from "react-hot-toast";
import styles from "./AddDiaryEntryForm.module.css";

type Emotion = {
  _id: string;
  title: string;
};

type Props = {
  onSuccess: () => void;
  initialData?: {
    _id?: string;
    title?: string;
    text?: string;
    categories?: { _id: string }[] | string[];
  };
};

type FormValues = {
  title: string;
  text: string;
  categories: string[];
};

const schema = Yup.object({
  title: Yup.string().required("Введіть заголовок"),
  text: Yup.string().required("Введіть текст"),
  categories: Yup.array().min(1, "Оберіть емоцію"),
});

export default function AddDiaryEntryForm({
  onSuccess,
  initialData,
}: Props) {
  const [emotions, setEmotions] = useState<Emotion[]>([]);

  useEffect(() => {
    const fetchEmotions = async () => {
      try {
        const res = await fetch("api/emotions", {
          credentials: "include",
        });

      const data = await res.json();

      const normalized = Array.isArray(data)
        ? data
        : Array.isArray(data?.data)
         ? data.data
        : [];

        setEmotions(normalized);
      } catch (err) {
        console.error(err);
        setEmotions([]);
      }
    };

    fetchEmotions();
  }, []);

  const emotionOptions = useMemo(() => {
    return emotions.map((e) => ({
      value: e._id,
      label: e.title,
    }));
  }, [emotions]);

  const initialCategories = Array.isArray(initialData?.categories)
    ? typeof initialData.categories[0] === "string"
      ? initialData.categories
      : initialData.categories.map((c: any) => c._id)
    : [];

  return (
    <Formik<FormValues>
      enableReinitialize
      initialValues={{
        title: initialData?.title || "",
        text: initialData?.text || "",
        categories: initialCategories,
      }}
      validationSchema={schema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const res = await fetch("/api/diary", {
            method: initialData ? "PATCH" : "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...values,
              id: initialData?._id,
            }),
          });

          if (!res.ok) {
            throw new Error("Request failed");
          }

          toast.success(initialData ? "Оновлено" : "Створено");

          onSuccess();
        } catch (e) {
          toast.error("Помилка при збереженні запису");
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ values, setFieldValue, isSubmitting }) => (
        <Form className={styles.form}>
          {}
          <label>Заголовок</label>
          <Field
            name="title"
            placeholder="Введіть заголовок"
            className={styles.input}
          />
          <ErrorMessage name="title" component="div" className={styles.error} />

          {}
          <label>Категорії</label>

          <Select
            isMulti
            options={emotionOptions}
            value={emotionOptions.filter((o) =>
              values.categories.includes(o.value)
            )}
            onChange={(selected) => {
              setFieldValue(
                "categories",
                selected ? selected.map((s) => s.value) : []
              );
            }}
            placeholder="Оберіть емоції"
          />

          <ErrorMessage
            name="categories"
            component="div"
            className={styles.error}
          />

          {}
          <label>Запис</label>
          <Field
            as="textarea"
            name="text"
            placeholder="Як ви себе відчуваєте?"
            className={styles.textarea}
          />
          <ErrorMessage name="text" component="div" className={styles.error} />

          {}
          <button type="submit" disabled={isSubmitting} className={styles.btn}>
            {isSubmitting ? "Збереження..." : initialData ? "Оновити" : "Зберегти"}
          </button>
        </Form>
      )}
    </Formik>
  );
}