import React  from 'react';
import { View, StyleSheet } from 'react-native';
import {  Text, ListItem } from '@rneui/themed';
import Icon from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import { removeSavedMovieList } from '../reducers/persist';
import renderIf from '../utils/renderIf';

const Saved = (props) => {
  const { navigation } = props;
  const savedMovieList = useSelector((state) => state.persist.savedMovieList);
  const dispatch = useDispatch();
  renderItem = (item, index) => {
    return (
      <ListItem
        onPress={() => navigation.navigate('SavedDisplay', { item })}
        containerStyle={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
        bottomDivider
      >
        <ListItem.Content style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <ListItem.Title style={{ color: 'white', fontSize: 26 }}>{item.title}</ListItem.Title>
          <Icon
            onPress={() => dispatch(removeSavedMovieList(index))}
            name="trash"
            size={32}
            color={'#FF5733'}
          />
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
      {renderIf(
        !savedMovieList.length,
        <Text style={styles.noMoviesText}>
          {`No saved movies.
Play the game and save something.`}
        </Text>
      )}
      <FlatList data={savedMovieList} renderItem={({ item, index }) => renderItem(item, index)} />
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
  noMoviesText: {
    textAlign: 'center',
    color: 'rgba(255,255,255, 0.5)',
    fontSize: 24,
    marginTop: 10,
  },
});

export default Saved;
