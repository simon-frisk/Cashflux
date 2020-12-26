import SharedGroupPreferences from 'react-native-shared-group-preferences'
import { getCostString } from './currency'

const appGroup = 'group.com.cashflux'

export default async function(monthStatistics, categories, currency, theme) {
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
      theme,
      totalCostString: getCostString(monthStatistics.current.total, currency)
    }
    await SharedGroupPreferences.setItem('widgetData', data, appGroup)
  } catch(error) {
    console.log(error)
  }
}