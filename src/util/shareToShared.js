import SharedGroupPreferences from 'react-native-shared-group-preferences'

const appGroup = 'group.com.cashflux'

export default async function(monthStatistics, categories) {
  try {
    const data = []
    for(const categoryId in monthStatistics.current.categories) {
      const category = categories.find(category => category.id == categoryId)
      data.push({
        id: category.id,
        name: category.name,
        emoji: category. emoji,
        color: category.color,
        percentage: monthStatistics.current.categories[categoryId].percentage
      })
    } 
    await SharedGroupPreferences.setItem('widgetData', data, appGroup)
  } catch(error) {
    console.log(error)
  }
}