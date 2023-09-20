import React, { useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Button, Text, ListItem, CheckBox, Icon, Card } from '@rneui/themed';
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions } from 'react-native';
import { connect } from 'react-redux';
import * as globalActions from '../actions/global';
import { bindActionCreators } from 'redux';
import { FlatList } from 'react-native-gesture-handler';
import { dummySaves } from '../data/dummySaves';

const SaveModal = (props) => {
  const { actions, savedMovieList, navigation, showSaveModal } = props;
  const [currInput, setCurrInput] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Card containerStyle={{ borderRadius: 10 }}>
          <TouchableOpacity
            onPress={() => showSaveModal(false)}
            style={{ marginBottom: 5, alignItems: 'flex-end' }}
          >
            <Icon name="close" size={32} color={'black'} />
          </TouchableOpacity>
          <Card.Divider />
          <View style={{ flexDirection: 'row' }}>
            <TextInput
              maxLength={24}
              style={{ width: '80%' }}
              placeholder="Give your list a name"
              onChange={(e) => setCurrInput(e.nativeEvent.text)}
            />
            <TouchableOpacity
              disabled={!currInput}
              onPress={() => console.log('PRESSED SAVE')}
              style={{ padding: 10 }}
            >
              <Icon name="save" size={24} color={currInput ? '#6E6EF9' : 'rgba(0,0,0,0.5)'} />
            </TouchableOpacity>
          </View>
        </Card>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
    backgroundColor: 'transparent',
  },
  versionText: {
    color: 'black',
    position: 'absolute',
    bottom: 30,
    right: 15,
  },
  copyText: {
    color: 'black',
    position: 'absolute',
    bottom: 15,
    right: 15,
  },
  cardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    borderRadius: 5,
  },
});

const mapStateToProps = function (state) {
  return {
    savedMovieList: state.persist.savedMovieList,
  };
};
const ActionCreators = { ...globalActions };
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SaveModal);
