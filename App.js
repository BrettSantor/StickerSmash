import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useState } from 'react';

import ImageViewer from './components/customImageViewer';
import Button from './components/customButton';
import CircleButton from './components/customCircleButton';
import IconButton from './components/customIconButton';

import * as ImagePicker from 'expo-image-picker';

const PlaceholderImage = require('./assets/images/background-image.png');

export default function App() {
const [showAppOptions, setShowAppOptions]= useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

const pickImageAsync = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    quality: 1,
  });
  if (!result.canceled){
    setSelectedImage(result.assets[0].uri);
    setShowAppOptions(true);
  } else {
    alert('you did not select an image, dummy');
  }
};

const onReset = () => {
  setShowAppOptions(false);
};

const onAddSticker = () => {
  //please hold
};

const onSaveImageAsync = async () => {
  //please hold
};


  return (
    <View style={styles.container}>
      <View style = {styles.imageContainer}>
        <ImageViewer placeholderImageSource={PlaceholderImage} selectedImage={selectedImage}/>
        </View>
        {showAppOptions ? (
      <View style={styles.optionsContainer}>
        <View style={styles.optionsRow}>
          <IconButton icon="refresh" label="Reset" onPress={onReset}/>
          <CircleButton onPress={onAddSticker}/>
          <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync}/>
        </View>
      </View>
        ):(
      <View style= {styles.footerContainer}>
        <Button theme="primary" label="Choose a photo" onPress={pickImageAsync}/>
        <Button label="Use this photo" onPress={setShowAppOptions(true)}/>
      </View>
        )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer:{
    flex: 1,
    paddingTop: 58,
  },
  footerContainer: {
    flex: 1/3,
    alignItems: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
