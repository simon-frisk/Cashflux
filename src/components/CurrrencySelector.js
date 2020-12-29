import React, { useContext } from "react"
import dataContext from "../dataContext"
import SSelectionSlider from "./SSelectionSlider"
import SText from "./SText"
import {currencies} from '../util/currency'
import useStyle from "../util/useStyle"

export default function CurrencySelector() {
  const {currency, setCurrency} = useContext(dataContext)
  const style = useStyle()

  return (
    <>
      <SText fontSize={35}>Currency</SText>
      <SSelectionSlider
        items={currencies}
        selected={currency}
        selectColor={style.secondaryColor}
        setSelected={setCurrency}
        keyExtractor={currency => currency}
        textExtractor={currency => currency}
        boxStyle={{paddingHorizontal: 10}}
      />
    </>
  )
}