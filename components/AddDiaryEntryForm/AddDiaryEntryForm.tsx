import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import styles from "./AddDiaryEntryForm.module.css";

/* ✅ тип емоцій */
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

  useEffect(() => {
    fetch("/api/emotions")
      .then((res) => res.json())
      .then((data) => setEmotions(data.data));
  }, []);

  return (
    <Formik<FormValues>
      initialValues={{
        title: initialData?.title || "",
        text: initialData?.text || "",
        categories: initialData?.categories?.map((c) => c._id) || [],
      }}
      validationSchema={schema}
      onSubmit={async (values) => {
        const res = await fetch("/api/diary", {
          method: initialData ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...values,
            id: initialData?._id,
          }),
        });

        if (res.ok) onSuccess();
      }}
    >
      {({ values, setFieldValue }) => (
        <Form className={styles.form}>
          {/* TITLE */}
          <Field name="title" placeholder="Заголовок" />
          <ErrorMessage name="title" component="div" />

          {/* CHIPS */}
          <div className={styles.chips}>
            {values.categories.map((id) => {
              const e = emotions.find((x) => x._id === id);
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
                    ×
                  </button>
                </span>
              );
            })}
          </div>

          {/* DROPDOWN BUTTON */}
          <div
            onClick={() => setOpen((prev) => !prev)}
            className={styles.dropdownBtn}
          >
            Обрати емоції
          </div>

          {/* DROPDOWN */}
          {open && (
            <div className={styles.dropdown}>
              {emotions.map((e) => (
                <label key={e._id}>
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

          <ErrorMessage name="categories" component="div" />

          {/* TEXT */}
          <Field as="textarea" name="text" placeholder="Запис" />
          <ErrorMessage name="text" component="div" />

          {/* SUBMIT */}
          <button type="submit">
            {initialData ? "Оновити" : "Зберегти"}
          </button>
        </Form>
      )}
    </Formik>
  );
}