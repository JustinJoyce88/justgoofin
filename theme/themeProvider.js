import { Platform } from 'react-native';
import { lightColors, createTheme } from '@rneui/themed';

export default theme = createTheme({
  components: {
    Button: {
      titleStyle: {
        color: 'black',
      },
      containerStyle: {
        width: 200,
        marginHorizontal: 50,
        marginVertical: 10,
      },
      buttonStyle: {
        borderRadius: 50,
      },
      color: '#b0d8d6',
    },
    Input: {
      inputStyle: {
        width: '80%',
        color: '#c9efed',
        borderBottomColor: 'red'
      },
      labelStyle: {
        color: '#c9efed'
      },
      inputContainerStyle: {
        width:'80%',
        alignSelf: 'center'
      },
      errorStyle: {
        backgroundColor: 'rgba(0,0,0,0.2)',
      }
    },
  },
  lightColors: {
    ...Platform.select({
      default: lightColors.platform.android,
      ios: lightColors.platform.ios,
    }),
  },
});