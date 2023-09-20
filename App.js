import { ThemeProvider } from '@rneui/themed';
import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import React from 'react';
import { ChatGptProvider } from 'react-native-chatgpt';
import theme from './theme/themeProvider';
import { createStackNavigator } from '@react-navigation/stack';
import Landing from './src/screens/Landing';
import ChatGPTGame from './src/screens/ChatGPTGame';
import Saved from './src/screens/Saved';
import SavedDisplay from './src/screens/SavedDisplay';
import Settings from './src/screens/Settings';
import { persistor, store } from './src/store/store';
import { PersistGate } from 'redux-persist/integration/react';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <ChatGptProvider>
            <SafeAreaView style={styles.container}>
              <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">
                  <Stack.Screen options={{ title: '' }} name="Home" component={Landing} />
                  <Stack.Screen name="Play" component={ChatGPTGame} />
                  <Stack.Screen name="Settings" component={Settings} />
                  <Stack.Screen options={{ title: 'Saved List' }} name="Saved" component={Saved} />
                  <Stack.Screen
                    options={({ route }) => ({ title: route.params.item.title })}
                    name="SavedDisplay"
                    component={SavedDisplay}
                  />
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
