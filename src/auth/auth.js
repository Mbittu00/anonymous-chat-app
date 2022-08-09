import { StyleSheet, Text, View,TextInput,TouchableOpacity,Dimensions} from "react-native";
  let {width,height}=Dimensions.get('window')
  import {useState,useContext,useEffect}from'react'
  import Context from'../../context/context'
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import {useRoute } from '@react-navigation/native';
export default function Auth({navigation}) {

  let api=useContext(Context)
  let [name,setName]=useState('')
  let btn=async()=>{
    try {
  let res=await AsyncStorage.setItem('token',name)
  api.setToken(true)
  api.setTokenName(name)
  navigation.navigate('Home')
 // alert(name)
    } catch (e) {
      alert(e)
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <View style={styles.textContaner}>
    <Text style={styles.txt}>please enter your</Text>
  <Text style={styles.txt}>name for enjoy the chat</Text>
        </View>
        <TextInput style={styles.input}
        placeholder='enter your name'
        onChangeText={setName}/>
        <TouchableOpacity onPress={btn}>
        <View style={styles.btn}>
        <Text style={styles.bc}>Join</Text>
        </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },main:{
    borderWidth:1,
    borderColor:'gray',
    width:width-50,
    paddingTop:20,
    paddingBottom:20,
    borderRadius:20,
    alignItems: "center",
    justifyContent: "center",
  },textContaner:{
    alignItems: "center",
    justifyContent: "center",
    marginBottom:50
  },txt:{
    fontSize:20,
    fontStyle:'italic',
    color:'gray'
  },input:{
    borderWidth:1,
    borderColor:'gray',
    width:'90%',
    paddingTop:0,
    paddingBottom:0,
    borderRadius:20,
    height:40,
    paddingLeft:10,
    paddingRight:10,
    marginBottom:50
  },btn:{
    alignItems: "center",
    justifyContent: "center",
    borderWidth:1,
    height:35,
    width:80,
    borderRadius:20,
    borderColor:'gray'
  },bc:{
    color:'gray'
  }
});
