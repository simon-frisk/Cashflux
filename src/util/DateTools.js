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

export function getMonthlyExpenses(expenses) {
  //Returns a list of expenses for different months
  if(expenses.length == 0) return []
  let currentMonth = new Date(expenses[0].date)
  const months = [{string: getMonthString(currentMonth), expenses: []}]

  expenses.sort((e1, e2) => new Date(e2.date) > new Date(e1.date))
  
  for (const expense of expenses) {
    const month = expense.date
    while(getMonthString(month) != getMonthString(currentMonth.toDateString())) { // This is bad, tends to get to infinite loop (eg. if expenses list not sorted)
      currentMonth = nextMonth(currentMonth)
      months.push({string: getMonthString(currentMonth), expenses: []})
    }
    months[months.length - 1].expenses.push(expense)
  }
  return months
}

export function getMonthlyCategories(expenses) {
  //Returns  a list of categorized costs for every month
  return getMonthlyExpenses(expenses)
    .map(month => {
      const monthCategories = {}
      monthCategories.string = month.string.split(' ')[0]
      monthCategories.total = 0
      for (const expense of month.expenses) {
        if(!monthCategories[expense.category.id]) monthCategories[expense.category.id] = expense.cost
        else monthCategories[expense.category.id] += expense.cost
        monthCategories.total += expense.cost
      }
      return monthCategories
    })
}
