import SharedGroupPreferences from 'react-native-shared-group-preferences'
import { getCostString } from './currency'

const appGroup = 'group.com.cashflux'

export default async function(monthStatistics, categories, currency) {
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
      totalCostString: getCostString(monthStatistics.current.total, currency)
    }
    console.log(data)
    await SharedGroupPreferences.setItem('widgetData', data, appGroup)
  } catch(error) {
    console.log(error)
  }
}