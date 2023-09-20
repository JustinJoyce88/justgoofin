import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import {  Icon, Card } from '@rneui/themed';
import { Dimensions } from 'react-native';
import { useDispatch } from 'react-redux';
import { addSavedMovieList } from '../reducers/persist';

const SaveModal = (props) => {
  const { showSaveModal, numberedArray } = props;
  const [currInput, setCurrInput] = useState('');
  const dispatch = useDispatch();

  const itemToSave = {
    title: currInput,
    list: numberedArray,
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.cardContainer}>
        <Card containerStyle={{ borderRadius: 10 }}>
          <TouchableOpacity
            onPress={() => showSaveModal(false, false)}
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
              onPress={() => {
                dispatch(addSavedMovieList(itemToSave));
                showSaveModal(false, true);
              }}
              style={{ padding: 10 }}
            >
              <Icon name="save" size={24} color={currInput ? '#6E6EF9' : 'rgba(0,0,0,0.5)'} />
            </TouchableOpacity>
          </View>
        </Card>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  cardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    borderRadius: 5,
  },
});

export default SaveModal;
