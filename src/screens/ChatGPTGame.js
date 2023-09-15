import React, { useState, useRef } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useChatGpt, ChatGptError } from 'react-native-chatgpt';
import { Button, Text, Input } from '@rneui/themed';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import renderIf from '../utils/renderIf';

const ChatGPTGame = () => {
  const [gameType, setGameType] = useState('');
  const [playerText, setPlayerText] = useState('');
  const [movieList, setMovieList] = useState('');
  const [error, setError] = useState('');
  const { sendMessage } = useChatGpt();
  const [retrievingResponse, setRetrievingResponse] = useState(false);

  checkForErrors = () => {
    if (gameType === 'Era') {
      const regex = /^[0-9]{4}s$/gm;
      const match = playerText.match(regex);
      if (!match) {
        setError('Please enter a valid era. Must look like "1920s"');
      } else initMessage(playerText, gameType);
    } else initMessage(playerText, gameType);
  };

  initMessage = (playerText, gameType) => {
    const messageToChatGPT = `Give me 32 random movies from the ${playerText} ${gameType} in a list. Do not say anything else.`;
    setRetrievingResponse(true);
    sendMessage({
      message: messageToChatGPT,
      onAccumulatedResponse: ({ message, isDone }) => {
        setMovieList(message);
        if (isDone) {
          setRetrievingResponse(false);
          console.log(message);
          // The response is complete, you can send another message
        }
      },
      onError: (e) => {
        console.log(e);
        // Handle error accordingly
      },
    });
  };

  if (!gameType) {
    return (
      <View style={styles.container}>
        <LinearGradient
          // Background Linear Gradient
          colors={['#3e6279', '#87aba9']}
          style={styles.background}
        />
        <Text h4 style={{ textAlign: 'center', color: '#b0d8d6' }}>
          Do you want to play with movies from a specific era or specific genre?
        </Text>
        <Button onPress={() => setGameType('Era')} title="Era" />
        <Button onPress={() => setGameType('Genre')} title="Genre" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={['#3e6279', '#87aba9']}
        style={styles.background}
      />
      <Text h4 style={{ textAlign: 'center', color: '#b0d8d6', marginBottom: 10 }}>
        {!retrievingResponse ? `Provide your ${gameType}` : 'Talking to ChatGPT!'}
      </Text>
      <View style={{ flexDirection: 'row', width: '60%' }}>
        {renderIf(
          !retrievingResponse,
          <>
            <Input
              errorStyle={
                error ? { backgroundColor: 'rgba(0,0,0,0.5)', textAlign: 'center' } : null
              }
              errorMessage={error}
              placeholder={gameType === 'Era' ? 'eg. 1920s' : 'eg. Action'}
              onChange={(e) => {
                let text = e.nativeEvent.text;
                setPlayerText(text);
              }}
              maxLength={gameType === 'Era' ? 5 : 24}
            />
            <TouchableOpacity
              disabled={!playerText}
              onPress={async () => checkForErrors(playerText, gameType)}
              style={{ padding: 10 }}
            >
              <Icon size={24} name="send" color={'rgba(255,255,255,0.5)'} />
            </TouchableOpacity>
          </>
        )}
        {renderIf(
          retrievingResponse,
          <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%' }}>
            <ActivityIndicator size="large" color={'rgba(255,255,255,0.5)'} />
          </View>
        )}
      </View>
      {renderIf(
        movieList && !retrievingResponse,
        <View>
          <Text>{movieList}</Text>
        </View>
      )}
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

export default ChatGPTGame;
