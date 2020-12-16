import {Platform} from 'react-native'

export default () => {
  return {
    font: Platform.OS == 'ios' ? 'Arial Rounded MT Bold' : null
  }
}