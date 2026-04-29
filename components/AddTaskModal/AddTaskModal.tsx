import css from './AddTaskModal.module.css';

import AddTaskForm from '../AddTaskForm/AddTaskForm';

export default function TaskModal() {
  return (
    <div className={css.box}>
      <p className={css.title}>Нове завдання</p>
      <AddTaskForm />
    </div>
  );
}
