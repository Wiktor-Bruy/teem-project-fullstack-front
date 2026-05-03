import styles from './DiaryEntryDetails.module.css';

interface DiaryEntry {
  id: string;
  title: string;
  date: string;
  text: string;
  emotions: string[];
}

interface DiaryEntryDetailsProps {
  entry: DiaryEntry;
  onEdit: () => void;
  onDelete: () => void;
}

export default function DiaryEntryDetails({ entry, onEdit, onDelete }: DiaryEntryDetailsProps) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{entry.title}</h2>
      <p className={styles.date}>{entry.date}</p>
      <p className={styles.text}>{entry.text}</p>
      <div className={styles.emotions}>
        {entry.emotions.map((emotion, index) => (
          <span key={index} className={styles.emotion}>
            {emotion}
          </span>
        ))}
      </div>
      <div className={styles.buttons}>
        <button className={styles.editButton} onClick={onEdit}>
          Редагувати
        </button>
        <button className={styles.deleteButton} onClick={onDelete}>
          Видалити
        </button>
      </div>
    </div>
  );
}
