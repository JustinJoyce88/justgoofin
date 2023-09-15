import { Platform } from 'react-native';
import { Button, lightColors, createTheme } from '@rneui/themed';

export default theme = createTheme({
  components: {
    Button: {
      titleStyle: {
        color: 'white',
      },
    },
  },
  lightColors: {
    ...Platform.select({
      default: lightColors.platform.android,
      ios: lightColors.platform.ios,
    }),
  },
});