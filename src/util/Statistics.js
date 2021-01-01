

export function getCatgegoryStatistics(categories, expenses) {
  const stats = {
    current: {
      total: 0,
      categories: {}
    },
    months: []
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

  //All months
  

  //Return
  return stats
}