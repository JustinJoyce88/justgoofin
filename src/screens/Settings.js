import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, CheckBox, Icon } from '@rneui/themed';
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setMovieAmount } from '../reducers/persist';

const Settings = () => {
  const movieAmount = useSelector((state) => state.persist.movieAmount);
  const dispatch = useDispatch();

  const checkBoxes = [
    {
      title: 8,
      index: 0,
    },
    {
      title: 16,
      index: 1,
    },
    {
      title: 32,
      index: 2,
    },
  ];

  createCheckBoxes = () => {
    const renderCheckBoxes = checkBoxes.map((item, index) => {
      return (
        <CheckBox
          key={index}
          containerStyle={{ backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: 50 }}
          title={item.title}
          checked={item.title === movieAmount}
          onPress={() => {
            dispatch(setMovieAmount(item.title));
          }}
          checkedIcon={
            <Icon
              name="radio-button-checked"
              type="material"
              color="blue"
              size={25}
              iconStyle={{ marginRight: 10 }}
            />
          }
          uncheckedIcon={
            <Icon
              name="radio-button-unchecked"
              type="material"
              color="grey"
              size={25}
              iconStyle={{ marginRight: 10 }}
            />
          }
        />
      );
    });
    return renderCheckBoxes;
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={['#3e6279', '#87aba9']}
        style={styles.background}
      />
      <View style={{ padding: 15 }}>
        <Text h4 style={{ color: '#b0d8d6', marginLeft: 10, marginBottom: 10 }}>
          Movie amount:
        </Text>
        <View style={{ flexDirection: 'row' }}>{createCheckBoxes()}</View>
      </View>
      <View style={styles.copyText}>
        <Text>&#169; Justin Joyce</Text>
      </View>
      <View style={styles.versionText}>
        <Text>V 1.0</Text>
      </View>
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

export default Settings;
