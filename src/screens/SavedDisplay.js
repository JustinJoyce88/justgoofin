import React, { useState, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, Input, ListItem, CheckBox, Icon } from '@rneui/themed';
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions } from 'react-native';
import { connect } from 'react-redux';
import * as globalActions from '../actions/global';
import { bindActionCreators } from 'redux';
import { FlatList } from 'react-native-gesture-handler';
import { dummySaves } from '../data/dummySaves';

const SavedDisplay = (props) => {
  const { actions, savedMovieList, navigation } = props;
  renderItem = (item) => {
    return (
      <ListItem
        onPress={() => navigation.navigate('Play')}
        containerStyle={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
        bottomDivider
      >
        <ListItem.Content>
          <ListItem.Title>{item.title}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={['#3e6279', '#87aba9']}
        style={styles.background}
      />
      <FlatList data={dummySaves} renderItem={({ item }) => renderItem(item)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
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

export default connect(mapStateToProps, mapDispatchToProps)(SavedDisplay);