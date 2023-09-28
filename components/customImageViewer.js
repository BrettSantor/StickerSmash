import { StyleSheet, Image } from 'react-native';

export default function customImageViewer({placeholderImageSource, selectedImage}) {

const imageSource = selectedImage ? {uri: selectedImage} : placeholderImageSource;

    return (
        <Image source={imageSource.uri} style ={styles.image}/>
    );
}

const styles = StyleSheet.create({
    image: {
        width:320,
    height:440,
    borderRadius:18,
    }
})