import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  LinearGradient,
  ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Button} from 'react-native-elements';
import {showMessage} from 'react-native-flash-message';

import Context from '../../context/store';
import styles from './style';

const HomeScreen = ({route, navigation}) => {
  const {state, dispatch} = useContext(Context);
  const [uploadChoose, setUploadChoose] = useState(false);
  const [uploadByRef, setUploadByRef] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [refCode, setRefCode] = useState();

  const uploadChooseToggleModal = () => {
    setUploadChoose(!uploadChoose);
  };

  const uploadByRefToggleModal = () => {
    setUploadByRef(!uploadByRef);
  };

  const checkRefCode = () => {
    if (typeof refCode !== 'undefined') {
      var [refType, refID] = refCode.split('#');
      var refTypeParsed,
        checked = true;
      if (
        typeof refType !== 'undefined' &&
        typeof refID !== 'undefined' &&
        !isNaN(refID)
      ) {
        switch (refType) {
          case 'TLP':
            refTypeParsed = 'request';
            break;

          case 'STA':
            refTypeParsed = 'receiving';
            break;

          case 'RK':
            refTypeParsed = 'guidecontact';
            break;

          case 'TK':
            refTypeParsed = 'supplierContact';
            break;

          default:
            showMessage({
              message: 'Referans tipi bulunamadı!',
              type: 'danger',
              icon: {icon: 'auto', position: 'left'},
            });
            checked = false;
            break;
        }
        if (checked) {
          var data =
            '{"refID" : ' +
            parseInt(refID) +
            ', "refType" : "' +
            refTypeParsed +
            '"}';
          uploadByRefToggleModal();
          navigation.navigate('fileupload', {
            data: data,
          });
        }
      } else {
        showMessage({
          message: 'Referans Kodu Geçersiz!',
          type: 'danger',
          icon: {icon: 'auto', position: 'left'},
        });
      }
    }
  };

  return (
    <View style={styles.container}>
      <Button
        icon={<Icon name="file" size={15} color="white" />}
        title=" Dosya Yükle"
        onPress={() => {
          setUploadChoose(true);
        }}
      />

      <Modal isVisible={uploadChoose}>
        <View style={styles.content}>
          <Button
            buttonStyle={{marginBottom: 10}}
            icon={<Icon name="qrcode" size={15} color="white" />}
            title=" QR Kod İle Dosya Yükle"
            onPress={() => {
              uploadChooseToggleModal();
              navigation.navigate('qrscanner');
            }}
          />

          <Button
            icon={<Icon name="search" size={15} color="white" />}
            title=" Referans Kodu İle Dosya Yükle"
            onPress={() => {
              uploadChooseToggleModal();
              setTimeout(() => {
                setUploadByRef(true);
              }, 400);
              //uploadByRefToggleModal();
            }}
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

      <Modal isVisible={uploadByRef}>
        <View style={styles.content}>
          <TextInput
            style={styles.refCode}
            placeholder="Referans Kodu"
            placeholderTextColor="black"
            onChangeText={setRefCode}
          />

          <Button
            icon={<Icon name="search" size={15} color="white" />}
            title=" Ara"
            onPress={() => {
              checkRefCode();
            }}
          />

          <TouchableOpacity
            style={{alignItems: 'center', marginTop: 30}}
            onPress={() => {
              uploadByRefToggleModal();
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
