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
import Saved from './src/screens/Saved';
import Settings from './src/screens/Settings';

const Stack = createStackNavigator();

const App = () => {
  const myStore = getStore();
  const myPersistor = getPersistor();
  return (
    <Provider store={myStore}>
      <PersistGate persistor={myPersistor}>
        <ThemeProvider theme={theme}>
          <ChatGptProvider>
            <SafeAreaView style={styles.container}>
              <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">
                  <Stack.Screen name="Home" component={Landing} />
                  <Stack.Screen name="Play" component={ChatGPTGame} />
                  <Stack.Screen name="Settings" component={Settings} />
                  <Stack.Screen name="Saved" component={Saved} />
                </Stack.Navigator>
              </NavigationContainer>
            </SafeAreaView>
          </ChatGptProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
