export function datetimeFormat(strDate) {
  const date = new Date(strDate);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  let strTime = '';

  hours %= 12;
  hours = hours || 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  strTime = `${hours}:${minutes} ${ampm}`;

  return `${date.getMonth() +
    1}/${date.getDate()}/${date.getFullYear()}  ${strTime}`;
}
