import { OverlayTrigger, Popover, Tooltip } from 'react-bootstrap';
import colors from '../data/colors';

export default function ScrollBadge({
  top = 40,
  popUpDisabled = false,
  ...props
}) {
  return (
    <>
      <div
        className='d-inline shaded position-absolute'
        style={{
          top: top - 12,
          left: -10,
          background: '#5f5fb3',
          zIndex: 1,
          borderTopLeftRadius: '100%',
          height: 12,
          width: 120,
        }}
      ></div>
      <OverlayTrigger
        overlay={
          popUpDisabled ? (
            <></>
          ) : (
            <Popover
              className='px-2 border-0 text-center'
              body
              style={{
                background: '#f4edfa',
                fontSize: '.8em',
                width: '19em',
              }}
            >
              <span>
                Simple algorithm for the purpose of this demo, not the AI we use
                for the product.
              </span>
            </Popover>
          )
        }
      >
        <div
          className='user-select-none clickable d-inline-flex justify-content-center align-items-center shaded position-absolute font-weight-500'
          style={{
            top,
            left: -10,
            borderBottomRightRadius: 20,
            borderTopRightRadius: 20,
            borderBottomLeftRadius: 10,
            background: colors.blue,
            color: 'white',
            fontSize: '0.8em',
            height: 35,
            width: 120,
            zIndex: 3,
          }}
        >
          <b>Try</b>&nbsp;the AI
        </div>
      </OverlayTrigger>
    </>
  );
}
