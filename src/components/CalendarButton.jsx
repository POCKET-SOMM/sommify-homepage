import { createRef, useEffect } from 'react';

export default function CalendarButton({ children, onClick }) {
  //   const calendarButton = createRef();

  //   useEffect(() => {
  //     var target = calendarButton.current;

  //     window.addEventListener('load', function () {
  //       console.log('yeauuuu');
  //       if (target.getAttribute('listener') === 'true') {
  //         console.log('YP!!!!');
  //         return;
  //       } else {
  //         target.setAttribute('listener', 'true');
  //       }

  //       calendar.schedulingButton.load({
  //         url: 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ064y6ez3GrfT98S6PdGId4jyiQnXv-f26MUq2z_SGNteYdF8EdEM7J7Mmx-CLYoBMrqaloyAVs?gv=true',
  //         color: '#039BE5',
  //         label: 'setting up a call',
  //         target,
  //       });
  //     });
  //   }, []);

  return <span id='calendar-button'></span>;
}
