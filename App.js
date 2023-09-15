import { getPersistor, getStore } from './src/store/configureStore';
import { ThemeProvider } from '@rneui/themed';
import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { PersistGate } from 'redux-persist/es/integration/react';
import { Provider } from 'react-redux';
import React from 'react';
import { ChatGptProvider } from 'react-native-chatgpt';
import theme from './theme/themeProvider';
import { createStackNavigator } from '@react-navigation/stack';
import Landing from './src/screens/Landing';
import ChatGPTGame from './src/screens/ChatGPTGame';
import OfflineGame from './src/screens/OfflineGame';

const Stack = createStackNavigator();

const App = () => {
  const myStore = getStore();
  const myPersistor = getPersistor();
  return (
    <Provider store={myStore}>
      <ThemeProvider theme={theme}>
        <ChatGptProvider>
          <PersistGate persistor={myPersistor}>
            <SafeAreaView style={styles.container}>
              <NavigationContainer>
              <Stack.Navigator initialRouteName="Landing">
                <Stack.Screen name="Landing" component={Landing} />
                <Stack.Screen name="ChatGPTGame" component={ChatGPTGame} />
                <Stack.Screen name="OfflineGame" component={OfflineGame} />
              </Stack.Navigator>
              </NavigationContainer>
            </SafeAreaView>
          </PersistGate>
        </ChatGptProvider>
      </ThemeProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
