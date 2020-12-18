import React, { useContext } from "react"
import dataContext from "../dataContext"
import SSelectionSlider from "./SSelectionSlider"
import SText from "./SText"
import {currencies} from '../util/currency'

export default function CurrencySelector() {
  const {currency, setCurrency} = useContext(dataContext)

  return (
    <>
      <SText fontSize={35}>Currency</SText>
      <SSelectionSlider
        items={currencies}
        selected={currency}
        setSelected={setCurrency}
        keyExtractor={currency => currency}
        textExtractor={currency => currency}
        boxStyle={{paddingHorizontal: 10}}
      />
    </>
  )
}