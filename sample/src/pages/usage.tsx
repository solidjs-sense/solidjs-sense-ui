import { Link, Outlet } from 'solidjs-sense-router';
import styles from './usage.module.scss';

export default () => {
  return (
    <>
      <div class={styles.title}>组件使用示例</div>
      <div class={styles.ctn}>
        <div class={styles.nav}>
          <Link href="/usage/dialog" class={styles.item} activeClass={styles.active}>
            <span>Dialog</span>
          </Link>
          <Link href="/usage/color-picker" class={styles.item} activeClass={styles.active}>
            <span>Color Picker</span>
          </Link>
        </div>
        <div class={styles.content}>
          <Outlet />
        </div>
      </div>
    </>
  );
};
