import { ThreeDots } from 'react-loader-spinner';
import css from './Loader.module.css';

export const Loader = () => (
  <div className={css.loader}>
    <ThreeDots color="#3f51b5" height={80} width={80} />
  </div>
);
