import * as React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { useChatGpt } from 'react-native-chatgpt';
import { Button, Image, Text } from '@rneui/themed';
import { LinearGradient } from 'expo-linear-gradient';

const Login = (props) => {
  const { navigation } = props;
  const { status, login } = useChatGpt();
  if (status === 'initializing') return null;
  return (
    <View style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={['#3e6279', '#87aba9']}
        style={styles.background}
      />
      <Text h2 style={{ marginBottom: 5, textAlign: 'center', color: '#b0d8d6' }}>
        Head 2 Head
      </Text>
      <Text h6 style={{ marginBottom: 20, textAlign: 'center', color: '#b0d8d6' }}>
        Rank movies randomly picked by ChatGPT
      </Text>
      <Image
        style={{ height: 100, width: 100, marginBottom: 10 }}
        source={require('../../assets/icon.png')}
        PlaceholderContent={<ActivityIndicator />}
      />
      <Button
        onPress={() => {
          if (status === 'logged-out') {
            login();
          } else {
            navigation.navigate('Play');
          }
        }}
        title="Play"
      />
      {/* <Button
        onPress={() => {
          navigation.navigate('OfflineGame');
        }}
        title="Play offline"
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
