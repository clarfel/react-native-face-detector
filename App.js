import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FaceDetector,ImagePicker, Permissions } from 'expo'

import ImageCropper from 'react-native-image-crop-picker';

export default class App extends React.Component {
    _checkMultiPermissions = async () => {
        const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL,Permissions.CAMERA);
        if(status !== 'granted'){
            this._askCameraPermission()
        }else{
            this._renderImagePicker()
        }
    }
    _askCameraPermission = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL,Permissions.CAMERA);
        if (status !== 'granted') {
            alert("permission not granted")
        }else{
            alert("permission granted")
        }
    }
    _renderImagePicker = async () => {
        
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect:[1,1],
            quality:1,

        });
        console.log(result)
        console.log(this.detectFaces(result.uri))
    }

    
    detectFaces = async (imageUri) => {
        const options = { mode: FaceDetector.Constants.Mode.fast };
        return await FaceDetector.detectFacesAsync(imageUri, options);
      };
    onPress = () => {
        // ImagePicker.openPicker({
        //     width: 300,
        //     height: 300,
        //     cropping: true,
        //     cropperCircleOverlay:'true',useFrontCamera:'true'
        // }).then(image => {
        //     console.log(image);
        //     console.log(this.detectFaces(image))
        // });
        this._checkMultiPermissions()
    }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => {this.onPress()}}>
            <Text>pick image</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
