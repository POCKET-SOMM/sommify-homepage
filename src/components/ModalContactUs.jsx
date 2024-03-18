import ContactUs from './ContactUs';
import CustomModal from './CustomModal';

export default function ModalContactUs({ isOpen, close }) {
  return (
    <CustomModal
      isOpen={isOpen}
      close={close}
      style={{
        width: 600,
      }}
    >
      <ContactUs />
    </CustomModal>
  );
}
