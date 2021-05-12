import React, {useContext, useState} from 'react';
import {View, Text, TouchableOpacity, Button} from 'react-native';
import Modal from 'react-native-modal';

import Context from '../../context/store';
import styles from './style';

const HomeScreen = ({route, navigation}) => {
  const {state, dispatch} = useContext(Context);
  const [uploadChoose, setUploadChoose] = useState(false);

  const uploadChooseToggleModal = () => {
    setUploadChoose(!uploadChoose);
  };

  return (
    <View style={styles.container}>
      <Text>Anasayfa </Text>
      <TouchableOpacity
        onPress={() =>
          /* navigation.navigate('qrscanner', {
            data: '{"refID":10, "refType":"asd"}',
          })*/
          setUploadChoose(true)
        }>
        <Text>Dosya Yükle</Text>
      </TouchableOpacity>
      <Text>{state.userEmail}</Text>

      <Modal isVisible={uploadChoose}>
        <View style={styles.content}>
          <Text>Hello!</Text>

          <Button title="Hide modal" onPress={uploadChooseToggleModal} />
        </View>
      </Modal>
    </View>
  );
};

export default HomeScreen;
