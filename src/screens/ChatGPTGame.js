import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { useChatGpt } from 'react-native-chatgpt';
import { Button, Text, Input, ListItem } from '@rneui/themed';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import renderIf from '../utils/renderIf';
import { Dimensions } from 'react-native';
import { connect } from 'react-redux';
import SaveModal from '../modals/SaveModal';

const ChatGPTGame = (props) => {
  const { movieAmount } = props;
  const [gameType, setGameType] = useState('');
  const [playerText, setPlayerText] = useState('');
  const [leftArray, setLeftArray] = useState([]);
  const [rightArray, setRightArray] = useState([]);
  const [error, setError] = useState('');
  const [currArrIdx, setCurrArrIdx] = useState(0);
  const [winningArray, setWinningArray] = useState([]);
  const [overallRankArray, setOverallRankArray] = useState([]);
  const [saveModal, showSaveModal] = useState(false);
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

  parseResponse = (message) => {
    let cleanMessage = message.replace(/^[^:]+:\s*/, ''); //remove first sentence followed by colon
    let initMovieArray = cleanMessage.split(/\s(?=\d+\.)/);
    const fullMovieArr = initMovieArray.map((movie) => {
      return movie.replace(/^\d+(\.\d+)*./gm, '').trim(); //remove numbers and decimal
    });
    splitArray(fullMovieArr);
    initGameSettings();
  };

  splitArray = (array) => {
    //split the array in half and assign the first half to the first movie array and the second half to the second movie array
    const half = Math.ceil(array.length / 2);
    const leftArray = array.slice(0, half);
    const rightArray = array.slice(half);
    setRightArray(rightArray);
    setLeftArray(leftArray);
    setWinningArray([]);
    setCurrArrIdx(0);
  };

  initGameSettings = () => {
    setCurrArrIdx(0);
  };

  initMessage = (playerText, gameType) => {
    const messageToChatGPT = `Give me ${movieAmount} random movies from the ${playerText} ${gameType}. Give me only the list. Do not say anything else.`;
    setRetrievingResponse(true);
    sendMessage({
      message: messageToChatGPT,
      onAccumulatedResponse: ({ message, isDone }) => {
        if (isDone) {
          setRetrievingResponse(false);
          parseResponse(message);
        }
      },
      onError: (e) => {
        setError(`The bot is not cooperating for one of many reasons. Possibly this one ${e}`);
      },
    });
  };

  nextStep = (arrayNotPicked, playerChoice, sidePressed) => {
    if (leftArray.length === 1 && sidePressed === 'left') {
      setOverallRankArray((prevArray) => [...prevArray, rightArray[0]]);
      setOverallRankArray((prevArray) => [...prevArray, leftArray[0]]);
      return;
    }
    if (rightArray.length === 1 && sidePressed === 'right') {
      setOverallRankArray((prevArray) => [...prevArray, leftArray[0]]);
      setOverallRankArray((prevArray) => [...prevArray, rightArray[0]]);
      return;
    }
    setWinningArray((prevArray) => [...prevArray, playerChoice]);
    setOverallRankArray((prevArray) => [...prevArray, arrayNotPicked[currArrIdx]]);
    setCurrArrIdx(currArrIdx + 1);
  };

  saveResults = () => {
    console.log('NEED TO SAVE TO REDUX PERSIST');
  };

  getColor = () => {
    return (
      'hsl(' +
      360 * Math.random() +
      ',' +
      (25 + 70 * Math.random()) +
      '%,' +
      (85 + 10 * Math.random()) +
      '%)'
    );
  };

  renderItem = ({ item, index }) => {
    if (index === 0) {
      return (
        <ListItem
          containerStyle={{ backgroundColor: 'rgba(255,255,255,0.3)', height: 150, marginTop: 25 }}
          bottomDivider
        >
          <ListItem.Content>
            <ListItem.Title style={{ fontSize: 26 }}>{item}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      );
    }
    return (
      <ListItem containerStyle={{ backgroundColor: 'rgba(255,255,255,0.2)' }} bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{item}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    );
  };

  //? CONDITIONAL RENDERS
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
        <View style={styles.shadowView}>
          <Button onPress={() => setGameType('Era')} title="Era" />
        </View>
        <View style={styles.shadowView}>
          <Button onPress={() => setGameType('Genre')} title="Genre" />
        </View>
      </View>
    );
  }

  // if (gameType && !rightArray.length && !leftArray.length) {
    if(false){
    return (
      <View style={styles.container}>
        <LinearGradient
          // Background Linear Gradient
          colors={['#3e6279', '#87aba9']}
          style={styles.background}
        />
        <Text h4 style={{ textAlign: 'center', color: '#b0d8d6', marginBottom: 10 }}>
          {!retrievingResponse ? `Provide your ${gameType}.` : 'Consulting the robot...'}
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
                  setPlayerText(e.nativeEvent.text);
                  setError('');
                }}
                maxLength={gameType === 'Era' ? 5 : 24}
              />
              <TouchableOpacity
                disabled={!playerText}
                onPress={async () => {
                  setError('');
                  checkForErrors(playerText, gameType);
                }}
                style={{ padding: 10 }}
              >
                <Icon
                  size={24}
                  name="send"
                  color={playerText.length ? 'rgba(255,255,255,0.5)' : 'rgba(250,128,114, 0.7)'}
                />
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
      </View>
    );
  }
  // if (gameType && overallRankArray.length !== movieAmount) {
    if(false){
    let currentRound = overallRankArray.length + 1;
    if (currArrIdx === leftArray.length) {
      splitArray(winningArray);
    }
    const randomLeftValue = getColor();
    const randomRightValue = getColor();
    return (
      <View style={styles.container}>
        <LinearGradient
          // Background Linear Gradient
          colors={['#3e6279', '#87aba9']}
          style={styles.background}
        />
        <Text h4 style={{ textAlign: 'center', color: '#b0d8d6', marginBottom: 10 }}>
          {`Round ${currentRound} of ${movieAmount}`}
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={() => nextStep(rightArray, leftArray[currArrIdx], 'left')}
            style={[styles.movieNameBox, { backgroundColor: `#${randomLeftValue}` }]}
          >
            <Text style={styles.movieNameBoxText}>{leftArray[currArrIdx]}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => nextStep(leftArray, rightArray[currArrIdx], 'right')}
            style={[styles.movieNameBox, { backgroundColor: `#${randomRightValue}` }]}
          >
            <Text style={styles.movieNameBoxText}>{rightArray[currArrIdx]}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  // if (overallRankArray.length === movieAmount) {
    if(true){
    const reversedArray = overallRankArray.reverse();
    const numberedArray = reversedArray.map((item, index) => {
      return `${index + 1}. ${item}`;
    });
    return (
      <View style={styles.container}>
        <LinearGradient
          // Background Linear Gradient
          colors={['#3e6279', '#87aba9']}
          style={styles.background}
        />
        <Text
          h4
          style={{ textAlign: 'center', color: '#b0d8d6', marginTop: 20, paddingHorizontal: 5 }}
        >
          Gee golly that was fun wasn't it!
        </Text>
        <Text h6 style={{ textAlign: 'center', color: '#b0d8d6', marginBottom: 10, marginTop: 5 }}>
          You can save results for viewing later.
        </Text>
        <TouchableOpacity onPress={() => showSaveModal(true)} style={{ padding: 10 }}>
          <Icon name="save" size={24} color="rgba(255,255,255,0.7)" />
        </TouchableOpacity>
        <FlatList
          style={{ width: '100%' }}
          keyExtractor={(item, index) => index.toString()}
          data={numberedArray}
          renderItem={(item, index) => renderItem(item, index)}
        />
        {renderIf(saveModal, <SaveModal showSaveModal={(show) => showSaveModal(show)} />)}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
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
  movieNameBox: {
    height: Dimensions.get('window').height / 5,
    width: Dimensions.get('window').width / 2.2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 0.5,
    margin: 5,
  },
  movieNameBoxText: {
    flexWrap: 'wrap',
    fontSize: 18,
    padding: 10,
    textAlign: 'center',
  },
  shadowView: {
    borderRadius: 50,
    shadowColor: '#171717',
    shadowOffset: { width: -5, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

const mapStateToProps = function (state) {
  return {
    movieAmount: state.persist.movieAmount,
  };
};

export default connect(mapStateToProps)(ChatGPTGame);
