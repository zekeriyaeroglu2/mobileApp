import React, {useEffect, useState, useContext} from 'react';
import * as ImagePicker from 'react-native-image-picker';
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Button, BottomSheet, ListItem, Icon} from 'react-native-elements';

import Context from '../../context/store';
import generalStyle from '../../styles/general';
import styles from './style';

import {showMessage} from 'react-native-flash-message';

import fileAPI from '../../services/api/file';

const HomeScreen = ({route, navigation}) => {
  const data = JSON.parse(route.params.data);
  const [reference, setreference] = useState();
  const [photo, setphoto] = useState();
  const [loading, setloading] = useState(true);
  const [bottomSheetVisible, setbottomSheetVisible] = useState(false);

  const {state, dispatch} = useContext(Context);
  useEffect(() => {
    const getRefInfo = () => {
      fileAPI.RefInfo(
        {
          refID: data.refID,
          refType: data.refType,
          email: state.userEmail,
          token: state.token,
          customerCode: state.customerCode,
        },
        refData => {
          if (refData) {
            setreference(refData);
            setloading(false);
          } else {
            navigation.navigate('home');
          }
        },
      );
    };

    getRefInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChoosePhoto = () => {
    ImagePicker.launchImageLibrary(
      {title: reference.type + 'İçin Fotoğraf Seç'},
      res => {
        if (res.uri) {
          setphoto(res);
          console.log(res);
        }
      },
    );
  };

  const handleTakePhoto = () => {
    ImagePicker.launchCamera({cameraType: 'Back'}, res => {
      if (res.uri) {
        setphoto(res);
      }
    });
  };

  const handleSubmitImage = () => {
    setloading(true);
    fileAPI.FileUpload(
      {
        refID: data.refID,
        refType: data.refType,
        fileData: photo,
        email: state.userEmail,
        token: state.token,
        customerCode: state.customerCode,
      },
      res => {
        if (res.status) {
          setloading(false);
          showMessage({
            message: res.message,
            type: 'success',
            icon: {icon: 'auto', position: 'left'},
          });
          setphoto(null);
        }
      },
    );
  };

  const bottomSheetList = [
    {
      title: 'Galeriden Seç',
      onPress: () => {
        handleChoosePhoto();
        setbottomSheetVisible(false);
      },
    },
    {
      title: 'Fotoğraf Çek',
      onPress: () => {
        setbottomSheetVisible(false);
        handleTakePhoto();
      },
    },
    {
      title: 'İptal',
      containerStyle: {backgroundColor: 'red'},
      titleStyle: {color: 'white'},
      onPress: () => setbottomSheetVisible(false),
    },
  ];

  if (loading) {
    return (
      <View style={generalStyle.loader}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.refInfo}>
        <Text>{reference.type} Numarası : </Text>
        <Text style={{fontWeight: 'bold'}}>{reference.code}</Text>
      </View>
      <Button
        buttonStyle={styles.choosePhotoBtn}
        title="Fotoğraf seç"
        onPress={() => {
          setbottomSheetVisible(true);
        }}
      />
      <View style={{alignItems: 'center'}}>
        {photo && (
          <>
            <Image style={styles.image} source={{uri: photo.uri}} />
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity onPress={() => setphoto(null)}>
                <Icon name="cancel" color="red" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleSubmitImage}
                style={{marginLeft: 50}}>
                <Icon name="check" color="green" />
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
      <BottomSheet
        isVisible={bottomSheetVisible}
        containerStyle={{
          backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)',
        }}>
        {bottomSheetList.map((l, i) => (
          <ListItem
            key={i}
            containerStyle={l.containerStyle}
            onPress={l.onPress}>
            <ListItem.Content>
              <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>
    </View>
  );
};

export default HomeScreen;
