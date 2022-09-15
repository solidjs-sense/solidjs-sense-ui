import { Link, Outlet } from 'solidjs-sense-router';
import { t } from '../util';
import './usage.module.scss';

export default () => {
  return (
    <>
      <div class="title">{t('usage-example')}</div>
      <div class="ctn">
        <div class="nav">
          <Link href="/usage/dialog" class="item" activeClass="active">
            <span>Dialog</span>
          </Link>
          <Link href="/usage/color-picker" class="item" activeClass="active">
            <span>Color Picker</span>
          </Link>
        </div>
        <div class="content">
          <Outlet />
        </div>
      </div>
    </>
  );
};
