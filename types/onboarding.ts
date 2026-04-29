import * as Yup from 'yup';

export interface OnboardingFormValues {
  avatar: File | null;
  gender: 'boy' | 'girl' | 'unknown' | '';
  deliveryDate: Date | null;
}

const today = new Date();
today.setHours(0, 0, 0, 0);

const maxDeliveryDate = new Date();
maxDeliveryDate.setDate(maxDeliveryDate.getDate() + 42 * 7);
maxDeliveryDate.setHours(23, 59, 59, 999);

export const OnboardingSchema = Yup.object().shape({
  avatar: Yup.mixed().nullable(),

  gender: Yup.string()
    .oneOf(['boy', 'girl', 'unknown'], 'Оберіть стать')
    .required('Це поле обов’язкове'),

  deliveryDate: Yup.date()
    .nullable()
    .required('Вкажіть дату пологів')
    .typeError('Оберіть коректну дату')
    .min(today, 'Дата не може бути в минулому')
    .max(maxDeliveryDate, 'Дата не може бути пізніше ніж через 42 тижні'),
});
