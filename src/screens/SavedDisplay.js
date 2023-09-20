import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ListItem } from '@rneui/themed';
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

const SavedDisplay = (props) => {
  const { route } = props;
  renderItem = (item) => {
    return (
      <ListItem containerStyle={{ backgroundColor: 'rgba(255,255,255,0.2)' }} bottomDivider>
        <ListItem.Content>
          <ListItem.Title style={{ fontSize: 18, color: 'white' }}>{item}</ListItem.Title>
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
      <FlatList
        style={{ width: '100%' }}
        keyExtractor={(item, index) => index.toString()}
        data={route.params.item.list}
        renderItem={({ item }) => renderItem(item)}
      />
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
});

export default SavedDisplay;
