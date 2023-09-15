import * as React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useChatGpt } from 'react-native-chatgpt';
import { Button } from '@rneui/themed';
import { LinearGradient } from 'expo-linear-gradient';

const Login = (props) => {
  const {navigation} = props;
  const { status, login } = useChatGpt();
  if (status === 'initializing') return null;
  return (
    <View style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={['#ddd6f3', 'rgba(250,172,168, 0.8)']}
        style={styles.background}
      />
      <Button
        onPress={() => {
          if(status === 'logged-out') {
            login();
          } else {
            navigation.navigate('ChatGPTGame');
          }
        }}
        title="Play with ChatGPT"
        buttonStyle={{
          backgroundColor: 'rgba(78, 116, 289, 1)',
          borderRadius: 3,
        }}
        containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
      />
      <Button
        onPress={() => {
          navigation.navigate('OfflineGame');
        }}
        title="Play offline"
        buttonStyle={{
          backgroundColor: 'rgba(78, 116, 289, 1)',
          borderRadius: 3,
        }}
        containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange',
  },
  image: {
    alignSelf: 'center',
    width: 128,
    height: 128,
    resizeMode: 'contain',
    borderRadius: 64,
    marginBottom: 32,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
});

export default Login;
