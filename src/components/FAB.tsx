import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import NewChat from '../icons/NewChat';

interface Props {
  onPress: () => void;
}

const FAB: React.FC<Props> = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <NewChat />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 10,
    right: 25,
  },
  button: {
    backgroundColor: 'blue',
    width: 56,
    height: 56,
    borderRadius: 30,
    alignItems:'center',
    justifyContent: 'center',
  },
});

export { FAB };
