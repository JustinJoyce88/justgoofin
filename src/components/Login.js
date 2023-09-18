import * as React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { useChatGpt } from 'react-native-chatgpt';
import { Button, Image, Text } from '@rneui/themed';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

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
      <View style={styles.shadowView}>
        <Image
          style={{
            height: 100,
            width: 100,
            marginBottom: 10,
          }}
          source={require('../../assets/icon.png')}
          PlaceholderContent={<ActivityIndicator />}
        />
      </View>
      <View style={styles.shadowView}>
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
      </View>
      <View style={styles.savedBtn}>
        <Icon
          onPress={() => navigation.navigate('Saved')}
          style={{ color: '#b0d8d6' }}
          name="save"
          size={52}
        />
      </View>
      <View style={styles.settingsBtn}>
        <Icon
          onPress={() => navigation.navigate('Settings')}
          style={{ color: '#b0d8d6' }}
          name="settings"
          size={52}
        />
      </View>
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
  shadowView: {
    borderRadius: 50,
    shadowColor: '#171717',
    shadowOffset: { width: -5, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  settingsBtn: {
    padding: 10,
    position: 'absolute',
    bottom: 15,
    right: 15,
  },
  savedBtn: {
    padding: 10,
    position: 'absolute',
    bottom: 15,
    right: 90,
  },
});

export default Login;
