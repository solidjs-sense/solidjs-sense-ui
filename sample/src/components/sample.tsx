import { createSignal, Show } from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';
import { t } from '../util';
import './sample.module.scss';

export enum SampleTypes {
  preview = 'preview',
  code = 'code',
}

export const Sample = (props: { code?: string; children: JSX.Element }) => {
  const [showType, setShowType] = createSignal<SampleTypes>(SampleTypes.preview);

  return (
    <div class="ctn">
      <div class="bar">
        <div onclick={() => setShowType(SampleTypes.preview)}>{t('preview')}</div>
        <div onclick={() => setShowType(SampleTypes.code)}>Code</div>
      </div>
      <div>
        <Show
          when={showType() === SampleTypes.preview}
          fallback={
            <pre>
              <code>{props.code}</code>
            </pre>
          }
        >
          {props.children}
        </Show>
      </div>
    </div>
  );
};
