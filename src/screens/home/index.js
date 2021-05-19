import React, {useContext, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Button} from 'react-native-elements';

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
          /*navigation.navigate('qrscanner', {
              data: '{"refID":10, "refType":"asd"}',
            })*/
          setUploadChoose(true)
        }>
        <Text>Dosya Yükle</Text>
      </TouchableOpacity>
      <Text>{state.userEmail}</Text>

      <Modal isVisible={uploadChoose}>
        <View style={styles.content}>
          <Button
            buttonStyle={{marginBottom: 10}}
            icon={<Icon name="qrcode" size={15} color="white" />}
            title=" QR Kod İle Dosya Yükle"
            onPress={() => {
              uploadChooseToggleModal();
              navigation.navigate('fileupload', {
                data: '{"refID":593, "refType":"request"}',
              });
            }}
          />

          <Button
            icon={<Icon name="search" size={15} color="white" />}
            title=" Referans Numarası İle Dosya Yükle"
          />

          <TouchableOpacity
            style={{alignItems: 'center', marginTop: 30}}
            onPress={() => {
              uploadChooseToggleModal();
            }}>
            <Text>
              Kapat <Icon name="close" size={15} color="black" />
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default HomeScreen;
