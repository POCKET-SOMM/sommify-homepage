import { motion } from 'framer-motion';
import CustomModal from './CustomModal';

export default function ModalBooking({ isOpen, close }) {
  return (
    <CustomModal
      isOpen={isOpen}
      close={close}
      style={{
        height: 800,
        width: 1400,
        padding: 0,
      }}
    >
      <iframe
        src='https://calendar.google.com/calendar/u/0/appointments/AcZssZ2mzIg5lKAVFzLu7R4umL4rgYYr7WV8yIOHwA8=?gv=true'
        style={{ width: '100%', height: '100%', border: 'none' }}
      />
    </CustomModal>
  );
}
