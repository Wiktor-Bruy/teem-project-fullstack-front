'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import DatePicker, { registerLocale } from 'react-datepicker';
import { uk } from 'date-fns/locale/uk';
import { toast, Toaster } from 'react-hot-toast';
import 'react-datepicker/dist/react-datepicker.css';

import { nextServer } from '@/lib/api/api';
import { OnboardingSchema, OnboardingFormValues } from '@/types/onboarding';
import styles from './OnboardingForm.module.css';
import Link from 'next/link';

registerLocale('uk', uk);

const genderMap = {
  boy: 'Хлопчик',
  girl: 'Дівчинка',
  unknown: 'Ще не знаю',
} as const;

type GenderKey = keyof typeof genderMap;

export const OnboardingForm: React.FC = () => {
  const router = useRouter();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const genderMenuRef = useRef<HTMLDivElement>(null);

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isGenderMenuOpen, setIsGenderMenuOpen] = useState(false);
  const [isGenderAnimating, setIsGenderAnimating] = useState(false);
  const [isDateAnimating, setIsDateAnimating] = useState(false);

  const today = new Date();

  const latestDeliveryDate = new Date();
  latestDeliveryDate.setDate(today.getDate() + 42 * 7);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        genderMenuRef.current &&
        !genderMenuRef.current.contains(event.target as Node)
      ) {
        setIsGenderMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const triggerFieldAnimation = (field: 'gender' | 'deliveryDate') => {
    if (field === 'gender') {
      setIsGenderAnimating(true);
      setTimeout(() => setIsGenderAnimating(false), 400);
    }

    if (field === 'deliveryDate') {
      setIsDateAnimating(true);
      setTimeout(() => setIsDateAnimating(false), 400);
    }
  };

  const formik = useFormik<OnboardingFormValues>({
    initialValues: {
      avatar: null,
      gender: '',
      deliveryDate: null,
    },

    validationSchema: OnboardingSchema,

    onSubmit: async (values, { setSubmitting }) => {
      try {
        if (values.avatar) {
          const formData = new FormData();
          formData.append('avatar', values.avatar);

          await nextServer.patch('/users/avatar', formData);
        }

        const babyGender =
          values.gender && (values.gender as GenderKey) in genderMap
            ? genderMap[values.gender as GenderKey]
            : undefined;

        await nextServer.patch('/users/current', {
          ...(babyGender ? { babyGender } : {}),
          birthDate: values.deliveryDate
            ? values.deliveryDate.toISOString()
            : null,
        });

        toast.success('Дані успішно збережено!');
        router.push('/');
      } catch (error) {
        toast.error('Сталася помилка при збереженні');
        console.error('Onboarding submit error:', error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (avatarPreview) {
      URL.revokeObjectURL(avatarPreview);
    }

    formik.setFieldValue('avatar', file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  return (
    <section className={styles.wrapper}>
      <Toaster position="top-right" />

      <div className={styles.containerRegister}>
        <div className={styles.containerTwo}>
          <div className={styles.logoContainer}>
            <div className={styles.logoWrapper}>
              <div className={styles.logo}>
                <Link href="/" className={styles.logo}>
                  <svg width="31" height="30">
                    <use href="/icons.svg#logo" />
                  </svg>

                  <svg width="61" height="13">
                    <use href="/icons.svg#icon-leleka" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          <div className={styles.globalForm}>
            <h1 className={styles.title}>Давайте познайомимось ближче</h1>

            <form
              className={styles.form}
              onSubmit={e => {
                e.preventDefault();

                formik.handleSubmit();

                if (!formik.values.gender) {
                  triggerFieldAnimation('gender');
                  formik.setFieldTouched('gender', true);
                }

                if (!formik.values.deliveryDate) {
                  triggerFieldAnimation('deliveryDate');
                  formik.setFieldTouched('deliveryDate', true);
                }
              }}
            >
              <div className={styles.avatarSection}>
                <div
                  className={styles.avatarCircle}
                  onClick={() => fileInputRef.current?.click()}
                >
                  {avatarPreview ? (
                    <Image
                      src={avatarPreview}
                      alt="Аватар"
                      fill
                      className={styles.image}
                    />
                  ) : (
                    <div className={styles.placeholder}>
                      <svg
                        width="56"
                        height="56"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#A0A0A0"
                        strokeWidth="1.5"
                      >
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                    </div>
                  )}
                </div>

                <input
                  type="file"
                  ref={fileInputRef}
                  hidden
                  accept="image/*"
                  onChange={handleAvatarChange}
                />

                <button
                  type="button"
                  className={styles.uploadBtn}
                  onClick={() => fileInputRef.current?.click()}
                >
                  Завантажити фото
                </button>
              </div>

              <div className={styles.inputContainer}>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Стать дитини</label>

                  <div
                    ref={genderMenuRef}
                    className={styles.customSelectWrapper}
                  >
                    <div
                      className={`${styles.selectField}
                      ${isGenderMenuOpen ? styles.active : ''}
                      ${
                        formik.touched.gender && formik.errors.gender
                          ? styles.inputInvalid
                          : ''
                      }
                      ${isGenderAnimating ? styles.shake : ''}`}
                      onClick={() => setIsGenderMenuOpen(!isGenderMenuOpen)}
                    >
                      <span
                        className={
                          formik.values.gender
                            ? styles.selectedText
                            : styles.placeholderText
                        }
                      >
                        {formik.values.gender === 'boy'
                          ? 'Хлопчик'
                          : formik.values.gender === 'girl'
                            ? 'Дівчинка'
                            : formik.values.gender === 'unknown'
                              ? 'Ще не знаю'
                              : 'Оберіть стать'}
                      </span>

                      <svg
                        width="24"
                        height="14"
                        className={`${styles.selectArrow} ${
                          isGenderMenuOpen ? styles.rotated : ''
                        }`}
                      >
                        <use href="/icons.svg#arrow-down" />
                      </svg>
                    </div>

                    {isGenderMenuOpen && (
                      <div className={styles.optionsList}>
                        <div
                          className={styles.option}
                          onClick={() => {
                            formik.setFieldValue('gender', 'boy');
                            setIsGenderMenuOpen(false);
                          }}
                        >
                          Хлопчик
                        </div>

                        <div
                          className={styles.option}
                          onClick={() => {
                            formik.setFieldValue('gender', 'girl');
                            setIsGenderMenuOpen(false);
                          }}
                        >
                          Дівчинка
                        </div>

                        <div
                          className={styles.option}
                          onClick={() => {
                            formik.setFieldValue('gender', 'unknown');
                            setIsGenderMenuOpen(false);
                          }}
                        >
                          Ще не знаю
                        </div>
                      </div>
                    )}
                  </div>

                  {formik.touched.gender && formik.errors.gender && (
                    <span className={styles.error}>{formik.errors.gender}</span>
                  )}
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>Планова дата пологів</label>

                  <div className={styles.datePickerWrapper}>
                    <DatePicker
                      selected={formik.values.deliveryDate}
                      onChange={(date: Date | null) =>
                        formik.setFieldValue('deliveryDate', date)
                      }
                      minDate={today}
                      maxDate={latestDeliveryDate}
                      dateFormat="dd.MM.yyyy"
                      locale="uk"
                      wrapperClassName={styles.datePickerCustom}
                      className={`${styles.input}
                      ${
                        formik.touched.deliveryDate &&
                        formik.errors.deliveryDate
                          ? styles.inputInvalid
                          : ''
                      }
                      ${isDateAnimating ? styles.shake : ''}`}
                      placeholderText="16.07.2025"
                      autoComplete="off"
                    />
                  </div>

                  {formik.touched.deliveryDate &&
                    formik.errors.deliveryDate && (
                      <span className={styles.error}>
                        {String(formik.errors.deliveryDate)}
                      </span>
                    )}
                </div>
              </div>

              <button
                type="submit"
                disabled={formik.isSubmitting}
                className={styles.button}
              >
                {formik.isSubmitting ? 'Збереження...' : 'Зберегти'}
              </button>
            </form>
          </div>
        </div>

        <div className={styles.background}></div>
      </div>
    </section>
  );
};
