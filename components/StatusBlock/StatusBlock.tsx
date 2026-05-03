"use client";

import { useEffect, useState } from "react";
import styles from "./StatusBlock.module.css";

interface WeekData {
  week: number;
  daysLeft: number;
}

const StatusBlock = () => {
  const [data, setData] = useState<WeekData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWeeks = async () => {
      try {
        const res = await fetch("/api/weeks");

        if (!res.ok) throw new Error("Failed to fetch");

        const result = await res.json();
        setData(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeeks();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data) return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <p className={styles.label}>Тиждень</p>
        <p className={styles.value}>{data.week}</p>
      </div>

      <div className={styles.card}>
        <p className={styles.label}>Днів до зустрічі</p>
        <p className={styles.value}>~{data.daysLeft}</p>
      </div>
    </div>
  );
};

export default StatusBlock;