import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, ListView, FlatList } from 'react-native';
import { useState } from 'react';


export default function Lista() {
  const [contador, setContador] = useState(0);
  const [nombre, setNombre] = useState('');
  const [mensaje, setMensaje] = useState('');

  const [listaAlumnos, setListaAlumnos] = useState([]);

  function saludarAlumno(){
    if(nombre.trim() === ''){
      setMensaje('Escribe tu nombre');
    }
    else{
      setMensaje(`Hola, ${nombre}`)
    }
  }

  function contarCaracteres(){
    if(nombre.length === 0){
      setMensaje("🎃🎃🎃🎃🎃");
    }
    if (nombre.length <= 10){
      setMensaje("👻👻👻👻👻")
    }
    if(nombre.length > 10 && nombre.length < 20){
      setMensaje('🧛🧛🧛🧛🧛')
    }
  }


  function agregarNombre() {
    if (nombre.trim() === '')
      return;
    setListaAlumnos([...listaAlumnos, { nombre }]);
    setNombre('');
  }

  function borrarAlumno(index) {
    const nuevaLista = listaAlumnos.filter((_, i) => i !== index);
    setListaAlumnos(nuevaLista);
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Escribe tu nombre'
        value={nombre}
        onChangeText={setNombre}
        style={styles.input}
      />

      <Button title='Agregar alumno a la lista' onPress={agregarNombre} />

      <FlatList
        data={listaAlumnos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.item}>
            <Text>{item.nombre}</Text>
            <Button title="Borrar" onPress={() => borrarAlumno(index)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40
  },

  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
  },
  
  item: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop:10,
    marginBottom: 8,
  },

});