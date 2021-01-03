export const getDayString = dateString => {
  //Takes date string and returns a month string for presentation
  return dateString.split(' ').slice(0, -1).join(' ')
}

export const getMonthString = date => {
  //Takes some date string and returns a month string for presentation
  const dateString = new Date(date).toDateString()
  return dateString.split(' ')[1] + ' ' + dateString.split(' ')[3]
}

export function nextMonth(date) {
  //Takes a date object and returns a new date object for month before
  const nextDate = new Date(date.getFullYear(), date.getMonth() - 1)
  return nextDate
}