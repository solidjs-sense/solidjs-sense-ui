import { createEffect, createSignal, onCleanup, Show } from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';
import { Portal } from 'solid-js/web';

import './dialog.module.scss';

export type DialogProps = {
  type?: 'popup' | 'modal';
  children: JSX.Element;
  visible?: boolean;
  onMask?: () => void;
  classCtn?: string;
  classMask?: string;
  duration?: string;
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
        <Show when={true}>
          <div
            class={`mask ${props.classMask || ''}`}
            classList={{
              hide: !showAnimate(),
            }}
            onclick={props.onMask}
            style={{
              'transition-duration': props.duration || '0.35s',
            }}
          ></div>
        </Show>
        <div
          class={`ctn ${props.classCtn || ''}`}
          classList={{
            popup: props.type !== 'modal',
            modal: props.type === 'modal',
          }}
          style={{
            'transition-duration': props.duration || '0.35s',
            ...style(),
          }}
        >
          {props.children}
        </div>
      </Portal>
    </Show>
  );
}
