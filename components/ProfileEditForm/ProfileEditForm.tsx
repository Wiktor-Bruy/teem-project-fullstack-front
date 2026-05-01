'use client';

import { useState, useEffect } from 'react';
import styles from './ProfileEditForm.module.css';
import { User, BabyGender } from '@/types/types';
import { updateUser } from '@/lib/api/clientApi';

interface ProfileEditFormProps {
  user?: User;
  onUserUpdate?: (user: User) => void;
}

interface FormErrors {
  name?: string;
  email?: string;
}

export default function ProfileEditForm({ user, onUserUpdate }: ProfileEditFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    babyGender: 'not selected' as BabyGender,
    plannedDeliveryDate: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        babyGender: user.babyGender || 'not selected',
        plannedDeliveryDate: user.plannedDeliveryDate || '',
      });
    }
  }, [user]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Ім'я не може бути порожнім";
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email не може бути порожнім';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Введіть коректний email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleReset = () => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        babyGender: user.babyGender || 'not selected',
        plannedDeliveryDate: user.plannedDeliveryDate || '',
      });
      setErrors({});
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const updatedUser = await updateUser(formData);
      onUserUpdate?.(updatedUser);
    } catch (error) {
      console.error('Failed to update user:', error);
      setErrors({ name: 'Помилка при збереженні даних' });
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return <div className={styles.container}>Завантаження...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.title}>Редагування профілю</h2>

      <div className={styles.formGroup}>
        <label htmlFor="name" className={styles.label}>
          Ім'я
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
          placeholder="Введіть ім'я"
        />
        {errors.name && <span className={styles.errorMessage}>{errors.name}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="email" className={styles.label}>
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
          placeholder="Введіть email"
        />
        {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="babyGender" className={styles.label}>
          Стать дитини
        </label>
        <select
          id="babyGender"
          name="babyGender"
          value={formData.babyGender}
          onChange={handleChange}
          className={styles.select}
        >
          <option value="not selected">Не вибрано</option>
          <option value="girl">Дівчинка</option>
          <option value="boy">Хлопчик</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="plannedDeliveryDate" className={styles.label}>
          Планова дата пологів
        </label>
        <input
          type="date"
          id="plannedDeliveryDate"
          name="plannedDeliveryDate"
          value={formData.plannedDeliveryDate}
          onChange={handleChange}
          className={styles.input}
        />
      </div>

      <div className={styles.buttonGroup}>
        <button
          type="button"
          onClick={handleReset}
          className={styles.resetButton}
          disabled={isLoading}
        >
          Відмінити зміни
        </button>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={isLoading}
        >
          {isLoading ? 'Збереження...' : 'Зберегти зміни'}
        </button>
      </div>
    </form>
  );
}
