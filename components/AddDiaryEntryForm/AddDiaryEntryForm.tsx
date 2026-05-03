import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useEffect, useMemo, useRef, useState } from "react";
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
    categories?: { _id: string }[];
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
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchEmotions = async () => {
      try {
        const res = await fetch("/api/emotions");
        const data = await res.json();

        const normalized =
          Array.isArray(data)
            ? data
            : Array.isArray(data?.data)
            ? data.data
            : [];

        setEmotions(normalized);
      } catch (err) {
        console.error("Failed to fetch emotions:", err);
        setEmotions([]);
      }
    };

    fetchEmotions();
  }, []);

  const emotionsMap = useMemo(() => {
    if (!Array.isArray(emotions)) return {};
    return Object.fromEntries(emotions.map((e) => [e._id, e]));
  }, [emotions]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <Formik<FormValues>
      initialValues={{
        title: initialData?.title || "",
        text: initialData?.text || "",
        categories: initialData?.categories?.map((c) => c._id) || [],
      }}
      validationSchema={schema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const res = await fetch("/api/diary", {
            method: initialData ? "PATCH" : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...values,
              id: initialData?._id,
            }),
          });

          if (res.ok) {
            onSuccess();
          }
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ values, setFieldValue, isSubmitting }) => (
        <Form className={styles.form}>
          <label className={styles.label}>Заголовок</label>
          <Field name="title" className={styles.input} />
          <ErrorMessage name="title" component="div" className={styles.error} />

          <label className={styles.label}>Категорії</label>

          <div className={styles.chips}>
            {values.categories.map((id) => {
              const e = emotionsMap[id];
              if (!e) return null;

              return (
                <span key={id} className={styles.chip}>
                  {e.title}
                  <button
                    type="button"
                    onClick={() =>
                      setFieldValue(
                        "categories",
                        values.categories.filter((c) => c !== id)
                      )
                    }
                  >
                    <img src="/icons/close.svg" alt="close" />
                  </button>
                </span>
              );
            })}
          </div>

          <div ref={dropdownRef} className={styles.dropdownWrapper}>
            <button
              type="button"
              className={styles.dropdownBtn}
              onClick={(e) => {
                e.stopPropagation();
                setOpen((prev) => !prev);
              }}
            >
              Обрати емоції
            </button>

            {open && (
              <div
                className={styles.dropdown}
                onClick={(e) => e.stopPropagation()}
              >
                {Array.isArray(emotions) &&
                  emotions.map((e) => (
                    <label key={e._id} className={styles.dropdownLabel}>
                      <input
                        type="checkbox"
                        checked={values.categories.includes(e._id)}
                        onChange={() => {
                          if (values.categories.includes(e._id)) {
                            setFieldValue(
                              "categories",
                              values.categories.filter((c) => c !== e._id)
                            );
                          } else {
                            setFieldValue("categories", [
                              ...values.categories,
                              e._id,
                            ]);
                          }
                        }}
                      />
                      {e.title}
                    </label>
                  ))}
              </div>
            )}
          </div>

          <ErrorMessage
            name="categories"
            component="div"
            className={styles.error}
          />

          <label className={styles.label}>Запис</label>
          <Field as="textarea" name="text" className={styles.textarea} />
          <ErrorMessage name="text" component="div" className={styles.error} />

          <button
            type="submit"
            className={styles.submit}
            disabled={isSubmitting}
          >
            {initialData ? "Оновити" : "Зберегти"}
          </button>
        </Form>
      )}
    </Formik>
  );
}