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
  const [top, setTop] = createSignal(0);

  let contentRef: HTMLDivElement | undefined;
  let timer: NodeJS.Timeout | undefined;

  createEffect(() => {
    if (props.visible) {
      setPending(true);
      setTimeout(() => {
        setTop(contentRef!.clientHeight);
      }, 16);
    } else {
      setTop(0);
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
      return {
        top: `calc(100% - ${top()}px)`,
      };
    }
    return {
      opacity: top() === 0 ? 0 : 1,
      transform: `translate(-50%, -50%) scale(${top() === 0 ? 0.5 : 1})`,
    };
  };

  return (
    <Show when={pending() || props.visible}>
      <Portal>
        <div class={`${styles.mask} ${top() === 0 && styles.hide}`} onclick={props.onMask}></div>
        <div
          class={`${styles.ctn}`}
          classList={{
            [styles.popup]: props.type !== 'modal',
            [styles.modal]: props.type === 'modal',
          }}
          style={style()}
        >
          <div ref={contentRef}>{props.children}</div>
        </div>
      </Portal>
    </Show>
  );
}
