import css from './WeekSelector.module.css';

export default function WeekSelector() {
  
  return (
    <section className="section-weeks">
      <div className="weeks-scroll-container">
        <button className="button-week">
          <p className="week-number">6</p>
          <p className="week-name">Тиждень</p>
        </button>
      </div>
    </section>
  );
}
