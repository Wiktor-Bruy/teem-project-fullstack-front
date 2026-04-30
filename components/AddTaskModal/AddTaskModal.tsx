'use client';

import css from './AddTaskModal.module.css';

import AddTaskForm from '../AddTaskForm/AddTaskForm';

interface TaskModalProps {
  onCreate: () => void;
}

export default function TaskModal({ onCreate }: TaskModalProps) {
  return (
    <div className={css.box}>
      <p className={css.title}>Нове завдання</p>
      <AddTaskForm />
    </div>
  );
}
