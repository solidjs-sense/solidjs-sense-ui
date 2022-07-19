import { createEffect, createSignal, onCleanup, Show } from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';
import { Portal } from 'solid-js/web';

import styles from './dialog.module.scss';

export type DialogProps = {
  type?: 'popup' | 'modal';
  children: JSX.Element;
  visible?: boolean;
  onMask?: () => void;
};

export function Dialog(props: DialogProps) {
  const [pending, setPending] = createSignal(false);
  const [showAnimate, setShowAnimate] = createSignal(false);

  let timer: NodeJS.Timeout | undefined;

  createEffect(() => {
    if (props.visible) {
      setPending(true);
      setTimeout(() => {
        setShowAnimate(true);
      }, 16);
    } else {
      setShowAnimate(false);
      timer = setTimeout(() => {
        setPending(false);
      }, 350);
    }
  });

  onCleanup(() => {
    if (timer) {
      clearTimeout(timer);
      timer = undefined;
    }
  });

  const style = () => {
    if (props.type !== 'modal') {
      if (!showAnimate()) {
        return;
      }
      return {
        transform: 'translate3d(0, -100%, 0)',
      };
    }
    return {
      opacity: !showAnimate() ? 0 : 1,
      transform: `translate(-50%, -50%) scale(${!showAnimate() ? 0.5 : 1})`,
    };
  };

  return (
    <Show when={pending() || props.visible}>
      <Portal>
        <div class={`${styles.mask} ${!showAnimate() && styles.hide}`} onclick={props.onMask}></div>
        <div
          class={`${styles.ctn}`}
          classList={{
            [styles.popup]: props.type !== 'modal',
            [styles.modal]: props.type === 'modal',
          }}
          style={style()}
        >
          {props.children}
        </div>
      </Portal>
    </Show>
  );
}
