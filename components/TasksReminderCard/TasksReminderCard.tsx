'use client';
import { Task } from '@/types/types';
import css from './TasksReminderCard.module.css';
import { useRouter } from 'next/navigation';
export type { Task }  from '@/types/types';

type TasksReminderCardProps = {
  tasks: Task[];
  isAuthenticated: boolean;
  onToggleTask: (id: string) => void;
  onOpenModal: () => void;
}

export default function TasksReminderCard({
  tasks,
  isAuthenticated,
  onToggleTask,
  onOpenModal,
}: TasksReminderCardProps) {

  const router = useRouter();
    const handleAddClick = () => {
    if (isAuthenticated) {
      onOpenModal();
    } else {
      router.push('/register');
    }
    };

  return (
<section className={css.card}>
    <div className={css.header}>
      <h2 className={css.title}>Важливі завдання</h2>
      <button className={css.addBtn} onClick={handleAddClick}>
        +
      </button>
    </div>
    {tasks?.length === 0 ? (
      <p className={css.placeholder}>
        У вас ще немає активних завдань
      </p>
    ) : (
        <ul className={css.list}>
          {tasks.map((task) => (
          <li key={task._id} className={css.item}>
            <label className={css.label}>
                <input
                  type="checkbox"
                  checked={task.isDone}
                  onChange={() =>
                    onToggleTask(task._id)
                  }
                />
                <span className={task.isDone ? css.completed : ''}>
                  {task.date && (
                    <span className={css.date}>
                      {task.date}
                    </span>
                  )}
                  {task.title}
                </span>
            </label>
          </li>
          ))}
      </ul>
    )}
    </section>
  )
}
