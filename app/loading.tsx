import { Audio } from 'react-loader-spinner';
import css from './loadind.module.css';

export default function Loading() {
  return (
    <div className={css.cont}>
      <Audio height="80" width="80" ariaLabel="audio-loading" visible={true} />
    </div>
  );
}
