
export const getMonthString = date => date.split(' ')[1] + date.split(' ')[3]

export function getMonthlyExpenses(expenses) {
  const months = []

  
  let currentMonth
  let index = -1
  for (const expense of expenses) {
    const month = getMonthString(expense.date)
    if(month != currentMonth) {
      index ++
      currentMonth = month
      months[index] = []
    }
    months[index].push(expense)
  }

  return months
}