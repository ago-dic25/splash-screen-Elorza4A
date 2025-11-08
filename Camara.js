import { StyleSheet, Text, View, Button, TextInput, FlatList, ListView, Image } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import {Platform} from 'react-native';
import {Camera, CameraType, CameraView} from 'expo-camera';
import * as MediaLibrary  from 'expo-media-library';

export default function Camara() {
  const [permisoCamara, setPermisoCamara] = useState(null);
  const [image, setImage] = useState(null);
  const [tipoCamara, setTipoCamara] = useState('back');
  const camaraRef = useRef(null);

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setPermisoCamara(cameraStatus.status === 'granted');
    })();
  }, [])

  if(permisoCamara === false){
    return <Text>No hay acceso a la camara.</Text>
  }


  const tomarFoto = async () =>{
    if(camaraRef){
      try{
        const datosFoto = await camaraRef.current.takePictureAsync();
        setImage(datosFoto.uri);
        console.log(datosFoto);
        //const asset = await MediaLibrary.createAssetAsync(datosFoto.uri);
        //console.log('foto guardada en galeria', asset);
      }catch(error){
        console.log('error ' + error)
      }
    }
  }

  const guardarFoto = async  () => {
    if(image){
      try{
        await MediaLibrary.createAssetAsync(image);
        alert("Imagen guardada");
        setImage(null);
      }
      catch(error){
        console.log(e);
      }
    }
  }
  

  return (
    <View style={styles.container}>

      {!image ?

      <CameraView
        style={styles.camara}
        type={tipoCamara}
        ref={camaraRef}
      >
        
      </CameraView>
      :
      <Image source={{uri: image}} style={styles.camara}/>
      }

      <View>
        {image ?
          <View style={{
            flexDirection: 'row',
            justifyContent: 'center'
          }}>
            <Button title='Volver a tomar foto' onPress={() => setImage(null)}></Button>
            <Button title='Guardar foto' onPress={guardarFoto}></Button>
          </View>
          :
          <Button title='Tomar foto' onPress={tomarFoto}></Button>
        }
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    
  },
  camara: {
    flex: 1,
  },

  boton:{
    marginTop: 100,
  }
});
 