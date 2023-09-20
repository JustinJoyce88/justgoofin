import * as React from 'react';
import { useChatGpt } from 'react-native-chatgpt';
import Login from '../components/Login';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const Landing = (props) => {
  const { status } = useChatGpt();
  return (
    <View style={styles.container}>
      <Login navigation={props.navigation} />
      {status === 'getting_auth_token' && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="white" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Landing;
