import * as Font from 'expo-font'

export const fonts = {
  openSan: {
    regular: 'openSans_regular',
    regularItalic: 'openSans_regular_italic',
    semiBold: 'openSans_semiBold',
    semiBoldItalic: 'openSans_semiBold_italic',
    bold: 'openSans_bold',
    boldItalic: 'openSans_bold_italic',
  },
  Ubuntu: {
    regular: 'Ubuntu',
    light: 'UbuntuLight',
    semiBold: 'UbuntuMedium',
    bold: 'UbuntuBold'
  }
}

// fonts preloading
export const fontsAll = [
  {
    openSans_regular: require('../../assets/fonts/OpenSans-Regular.ttf'),
  },
  {
    openSans_regular_italic: require('../../assets/fonts/OpenSans-Italic.ttf'),
  },
  {
    openSans_semiBold: require('../../assets/fonts/OpenSans-Semibold.ttf'),
  },
  {
    openSans_semiBold_italic: require('../../assets/fonts/OpenSans-SemiboldItalic.ttf'),
  },
  {
    openSans_bold: require('../../assets/fonts/OpenSans-Bold.ttf'),
  },
  {
    openSans_bold_italic: require('../../assets/fonts/OpenSans-BoldItalic.ttf'),
  },
  {
    UbuntuLight: require('../../assets/fonts/Ubuntu-Light.ttf'), 
  },
  {
    Ubuntu: require('../../assets/fonts/Ubuntu-Regular.ttf'),
  },
  {
    UbuntuMedium: require('../../assets/fonts/Ubuntu-Medium.ttf'),
  },
  {
    UbuntuBold: require('../../assets/fonts/Ubuntu-Bold.ttf'),
  }

]
export const fontAssets = fontsAll.map((x) => Font.loadAsync(x))
