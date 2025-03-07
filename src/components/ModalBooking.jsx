import CustomModal from './CustomModal';
import { InlineWidget } from 'react-calendly';

export default function ModalBooking({ isOpen, close }) {
  return (
    <CustomModal
      noBody
      isOpen={isOpen}
      close={close}
      style={{
        height: 800,
        width: 1400,
        padding: 0,
      }}
    >
      {/* <iframe
        src='https://calendar.google.com/calendar/u/0/appointments/AcZssZ2mzIg5lKAVFzLu7R4umL4rgYYr7WV8yIOHwA8=?gv=true'
        style={{ width: '100%', height: '100%', border: 'none' }}
      /> */}
      <InlineWidget url='https://calendly.com/sommifyai?hide_gdpr_banner=1' />
    </CustomModal>
  );
}
