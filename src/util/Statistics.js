import * as DateTools from './DateTools'

export function getCatgegoryStatistics(categories, expenses) {
  /*const stats = {
    current: {
      total: 0,
      categories: {}
    },
    last: {
      total: 0,
      categories: {}
    }
  }

  //Current month
  const currentDate = new Date()
  
  for(const expense of expenses) {
    const date = new Date(expense.date)
    if(date.getMonth() == currentDate.getMonth() && date.getFullYear() == currentDate.getFullYear()) {
      stats.current.total += expense.cost
      if(!stats.current.categories[expense.category.id])
        stats.current.categories[expense.category.id] = {
          cost: 0
        }
        stats.current.categories[expense.category.id].cost += expense.cost
    }
  }

  for(const categoryId in stats.current.categories) {
    stats.current.categories[categoryId].percentage = Math.round(stats.current.categories[categoryId].cost / stats.current.total * 100) || 0
  }

  //Last month
  const lastMonthDate = DateTools.nextMonth(currentDate)
  console.log(lastMonthDate)

*/

  const stats = {
    months: [],
    current: null,
    last: null,
    avg12Months: {cost: 0, numMonths: 0, categories: {}}
  }

  for(const category of categories) {
    stats.avg12Months.categories[category.id] = {
      cost: 0,
      percentage: 0
    }
  }

  if(expenses.length == 0 || !expenses) {
    return stats
  } else {
    expenses.sort((e1, e2) => new Date(e2.date) > new Date(e1.date))
    const firstDate = new Date(Math.max(new Date(), new Date(expenses[0].date)))
    let date = firstDate

    let expenseIndex = 0

    while(true) {
      const month = {
        string: DateTools.getMonthString(date),
        expenses: [],
        total: 0,
        categories: {}
      }

      for(const category of categories) {
        month.categories[category.id] = {
          cost: 0,
          percentage: 0
        }
      }

      while(true) {
        if(expenseIndex == expenses.length)
          break
        const expense = expenses[expenseIndex]
        const expenseDate = new Date(expense.date)
        if(date.getMonth() != expenseDate.getMonth() || date.getFullYear() != expenseDate.getFullYear())
          break

        month.expenses.push(expense)
        month.total += expense.cost
        month.categories[expense.category.id].cost += expense.cost
        expenseIndex += 1
      }

      stats.months.push(month)
      if(date.getMonth() == new Date().getMonth() && date.getFullYear() == new Date().getFullYear())
        stats.current = month
      if(date.getMonth() == DateTools.nextMonth(new Date()).getMonth() && date.getFullYear() == DateTools.nextMonth(new Date()).getFullYear())
        stats.last = month
      if((new Date() - date.getTime()) / (30 * 24 * 60 * 60 * 1000) < 12) {
        stats.avg12Months.numMonths += 1
        month.expenses.forEach(expense => {
          stats.avg12Months.cost += expense.cost
          stats.avg12Months.categories[expense.category.id].cost += expense.cost
        })
      }
      for(const categoryId in month.categories) {
        month.categories[categoryId].percentage = Math.round(month.categories[categoryId].cost / month.total * 100 || 0)
      }
      date = DateTools.nextMonth(date)
      if(expenseIndex == expenses.length)
        break
    }

    for(const categoryId in stats.avg12Months.categories) {
      stats.avg12Months.categories[categoryId].percentage = Math.round(stats.avg12Months.categories[categoryId].cost / stats.avg12Months.cost * 100)
      stats.avg12Months.categories[categoryId].cost = Math.round(stats.avg12Months.categories[categoryId].cost / stats.avg12Months.numMonths)
    }

    return stats
  }
}