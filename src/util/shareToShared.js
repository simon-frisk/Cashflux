import SharedGroupPreferences from 'react-native-shared-group-preferences'

const appGroup = 'group.com.cashflux'

export default async function(monthStatistics, categories) {
  try {
    const categoriesData = []
    for(const categoryId in monthStatistics.current.categories) {
      const category = categories.find(category => category.id == categoryId)
      categoriesData.push({
        id: category.id,
        name: category.name,
        emoji: category. emoji,
        color: category.color,
        percentage: monthStatistics.current.categories[categoryId].percentage
      })
    } 
    const data = {
      categories: categoriesData,
      totalCost: monthStatistics.current.total
    }
    console.log(data)
    await SharedGroupPreferences.setItem('widgetData', data, appGroup)
  } catch(error) {
    console.log(error)
  }
}