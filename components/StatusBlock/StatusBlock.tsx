"use client";

import { useEffect, useState } from "react";
import styles from "./StatusBlock.module.css";

interface BabyResponse {
  weekNumber?: number;
  currentWeek?: number;
  daysLeft?: number;
}

interface BabyData {
  currentWeek: number;
  daysLeft: number;
}

export default function StatusBlock() {
  const [data, setData] = useState<BabyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/home/baby", {
          credentials: "include",
        });

        if (!res.ok) throw new Error("Failed to load data");

        const result: BabyResponse = await res.json();

        setData({
          currentWeek:
            result.currentWeek ??
            result.weekNumber ?? 
            0,
          daysLeft:
            result.daysLeft ?? 
            0,
        });
      } catch (err: any) {
        setError(err.message || "Error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  
  if (loading) return <p>Завантаження...</p>;
  if (error) return <p>Помилка: {error}</p>;
  if (!data) return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <p className={styles.label}>Тиждень</p>
        <p className={styles.value}>{data.currentWeek}</p>
      </div>

      <div className={styles.card}>
        <p className={styles.label}>Днів до зустрічі</p>
        <p className={styles.value}>
          {data.daysLeft ? `~${data.daysLeft}` : "—"}
        </p>
      </div>
    </div>
  );
}