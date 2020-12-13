import AsyncStorage from '@react-native-community/async-storage'

export async function storeDataLocal(data) {
    try {
      await AsyncStorage.setItem('categories', JSON.stringify(data.categories))
      await AsyncStorage.setItem('expenses', JSON.stringify(data.expenses))
      await AsyncStorage.setItem('currency', data.currency)
    } catch(error) {}
}

export async function getDataLocal() {
  try {
    const expensesJSON = await AsyncStorage.getItem('expenses')
    const categoriesJSON = await AsyncStorage.getItem('categories')
    const currency = await AsyncStorage.getItem('currency')

    return {
      expenses: JSON.parse(expensesJSON),
      categories: JSON.parse(categoriesJSON),
      currency
    }
  } catch(error) {}
}