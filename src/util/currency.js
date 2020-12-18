
const currencyData = [
  {
    unit: 'kr',
    order: 'after'
  },
  {
    unit: '$',
    order: 'before'
  },
  {
    unit: '£',
    order: 'before'
  },
  {
    unit: '€',
    order: 'after'
  },
  {
    unit: '¥',
    order: 'before'
  },
  {
    unit: 'CHF',
    order: 'before'
  },
  {
    unit: '₽',
    order: 'after'
  },
  {
    unit: '₺',
    order: 'before'
  }
]

export const currencies = currencyData.map(currency => currency.unit)

export function getCostString(cost, currencyInput) {
  for(const currency of currencyData) {
    if(currency.unit == currencyInput) {
      if(currency.order == 'before') return currency.unit + cost
      else return cost + currency.unit
    }
  }
  return currencyInput + cost
}