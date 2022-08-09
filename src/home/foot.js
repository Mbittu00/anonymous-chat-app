import { StyleSheet, Text, View,Dimensions,TextInput,Image } from 'react-native';
let {width,height}=Dimensions.get('window')
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import {useState,useEffect,useContext}from'react'
import Context from "../../context/context";
export default function Foot() {
  let {socket,tokenName}=useContext(Context)
  let [img,setImage]=useState('')
  let [text,setText]=useState('')
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
      base64: true,
    });

    

    if (!result.cancelled) {
    let sp=result.uri.split('.')
    socket.emit('file',{username:tokenName,
    base:`data:image/${sp[sp.length-1]};base64,${result.base64}`})
    //console.log(result.base64)
    }
  };
  let send=()=>{
 socket.emit('msg',{username:tokenName,text})
  setText('')
  }
  return (
    <View style={styles.container}>
<View style={styles.mainInput}>
<TextInput style={styles.input}
onChangeText={setText} value={text}/>
<Entypo name="attachment" size={24} color="black" 
style={styles.attachment}
onPress={pickImage}/>
</View>
<Ionicons name="send" size={30} color="black" 
style={styles.send} onPress={send}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom:0,
    width:width,
    justifyContent:'space-between',
    height:60
  },mainInput:{
    flexDirection:'row',
    borderWidth:1,
    width:'88%',
    alignItems:"center",
    height:50,
    borderRadius:20
  },input:{
    borderColor:'gray',
    color:'gray',
    width:'85%',
    marginLeft:10
  },attachment:{
    marginLeft:4
  },send:{
    marginRight:5
  }
});
