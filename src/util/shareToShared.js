import SharedGroupPreferences from 'react-native-shared-group-preferences'

const appGroup = 'group.com.cashflux'

const testData = [
  {
    id: 5,
    name: "Food",
    emoji: "📱",
    color: "#47f",
    percentage: 40
  },
  {
    id: 6,
    name: "Other",
    emoji: "📱",
    color: "#333",
    percentage: 60
  },
]

export default async function() {
  try {
    await SharedGroupPreferences.setItem('widgetData', testData, appGroup)
    const res = await SharedGroupPreferences.getItem('widgetData', appGroup)
    console.log(res)
  } catch(error) {
    console.log(error)
  }
}