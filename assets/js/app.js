//DOM ELEMENTS
const programDate = document.querySelector('.event-date');
const daysElement = document.querySelectorAll('.day');
const hourElement = document.querySelector('.hour');
const minutesElement = document.querySelector('.minute');
const secondsElement = document.querySelector('.second');

//DATE OBJECT
const date = 'June 12, 2024 13:30:00'; //PROGRAM ASSUMED DATE
const eventDate = new Date(date).toUTCString('en-US', {
  timeZone: 'Africa/Lagos',
});
let currentDate = new Date();
const msecCurrentDate = Date.parse(currentDate);
const msecEventDate = Date.parse(eventDate);
const totalRunTime = (msecEventDate - msecCurrentDate) / 1000; //TOTAL TIME IN SECONDS BEFORE EVENT STARTS

//VARIABLES
let startingSeconds = totalRunTime % 60;
let startingMinutes = Math.floor(totalRunTime / 60) % 60;
let startingHour = Math.floor(totalRunTime / 3600) % 24;
let startingDay = Math.floor(totalRunTime / 86400);

programDate.innerHTML = `<i class="fa-regular fa-calendar-days" style="color: #808836;"></i>  ${eventDate}`;
hourElement.innerHTML = startingHour;
minutesElement.innerHTML = startingMinutes;
secondsElement.innerHTML = startingSeconds;
daysElement.forEach((day) => (day.innerHTML = startingDay));

function startCountDown() {
  setInterval(() => {
    //SECONDS WATCH
    startingSeconds = startingSeconds - 1;
    if (startingSeconds >= 0) {
      if (startingSeconds.toString().length === 1) {
        secondsElement.innerHTML = '0' + startingSeconds.toString();
      } else {
        secondsElement.innerHTML = startingSeconds.toString();
      }
    } else {
      startingSeconds = 59;
      startingMinutes = startingMinutes - 1;
      secondsElement.innerHTML = startingSeconds.toString();
      minutesElement.innerHTML = startingMinutes.toString();
    }

    //MINUTES WATCH
    if (startingMinutes >= 0) {
      if (startingMinutes.toString().length === 1) {
        minutesElement.innerHTML = '0' + startingMinutes.toString();
      } else {
        minutesElement.innerHTML = startingMinutes.toString();
      }
    } else {
      startingMinutes = 59;
      startingHour = startingHour - 1;
      minutesElement.innerHTML = startingMinutes.toString();
      hourElement.innerHTML = startingHour.toString();
    }

    //HOUR WATCH
    if (startingHour > 0) {
      if (startingHour.toString().length === 1) {
        hourElement.innerHTML = '0' + startingHour.toString();
      } else {
        hourElement.innerHTML = startingHour.toString();
      }
    } else {
      startingHour = 23;
      startingDay = startingDay - 1;
      hourElement.innerHTML = startingHour.toString();
      daysElement.forEach((day) => (day.innerHTML = startingDay));
    }
  }, 1000);

  //RUSH TIME NOTIFICATION
  if (startingDay <= 10 && startingDay > 5) {
    daysElement[0].style.color = 'var(--clr-alert-100)';
  } else if (startingDay <= 5 && startingDay > 0) {
    daysElement[0].style.color = 'var(--clr-alert-200)';
  }
}

//SLEEP-WAKE SYNCHRONIZER
setInterval(() => {
  const firstLoadTime = currentDate.getTime();
  const timeCheck = new Date().getTime();
  console.log(firstLoadTime, timeCheck);
  if (timeCheck > firstLoadTime + 15 * 1000) {
    currentDate = new Date();
    console.log(currentDate.getTime());
  }
}, 2000);

startCountDown();
