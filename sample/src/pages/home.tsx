import { t } from '../util';
import './home.scss';

export default () => {
  return (
    <div class="home-ctn">
      <div class="content">
        <h1>{t('SolidJS UI')}</h1>
        <p>{t('That make sense')}</p>
      </div>
    </div>
  );
};
