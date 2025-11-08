import { StyleSheet, Text, View, Button, TextInput, FlatList, ListView, Image } from 'react-native';
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import Camara from "./Camara";

export default function App() {
  useEffect(() => {
    SplashScreen.preventAutoHideAsync(); // evita que se oculte el splash screen de forma predeterminada
    setTimeout(() => {
      SplashScreen.hideAsync(); // oculta después de 2s
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Camara></Camara>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});