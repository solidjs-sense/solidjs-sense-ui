import { createSignal } from 'solid-js';
import { Dialog } from '../../../../src';
import { Sample } from '../../components/sample';

const code = `
<Dialog visible={showActionSheet()} onMask={() => setShowActionSheet(false)}>
  <div
    style={{
      'border-radius': '8px 8px 0 0',
      background: '#fff',
      padding: '12px 24px',
      'min-height': '50vh',
    }}
  >
    Hello Popup
  </div>
</Dialog>
<Dialog visible={showModal()} type="modal" onMask={() => setShowModal(false)}>
  <div
    style={{
      width: '480px',
      'max-width': '80vw',
      'min-height': '360px',
      background: '#fff',
      padding: '12px 24px',
      'border-radius': '8px',
    }}
  >
    Hello Modal
  </div>
</Dialog>
`;

export default () => {
  const [showActionSheet, setShowActionSheet] = createSignal(false);
  const [showModal, setShowModal] = createSignal(false);

  return (
    <div>
      <Sample code={code}>
        <button onclick={() => setShowActionSheet(true)}>Open Popup</button>
        <button onclick={() => setShowModal(true)}>Open Modal</button>
      </Sample>
      <Dialog visible={showActionSheet()} onMask={() => setShowActionSheet(false)}>
        <div
          style={{
            'border-radius': '8px 8px 0 0',
            background: '#fff',
            padding: '12px 24px',
            'min-height': '50vh',
          }}
        >
          Hello Popup
        </div>
      </Dialog>
      <Dialog visible={showModal()} type="modal" onMask={() => setShowModal(false)}>
        <div
          style={{
            width: '480px',
            'max-width': '80vw',
            'min-height': '360px',
            background: '#fff',
            padding: '12px 24px',
            'border-radius': '8px',
          }}
        >
          Hello Modal
        </div>
      </Dialog>
    </div>
  );
};
