import {
  StyleSheet, Text, View,Image,Dimensions,Modal,Switch,Alert,TouchableOpacity
} from 'react-native';
let {width,height}=Dimensions.get('window')
import logo from'../../assets/happy.9b47deb4196bbb6605ca.png'
import {useState,useEffect,useContext}from'react'
import Context from "../../context/context";
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Head({msg}) {
  let {
socket,tokenName,chake,setChake
  }=useContext(Context)
    let [online,setOnline]=useState([])
    let [modalVisible,setModalVisible]=useState(false)
useEffect(()=>{
    if (tokenName) {
     socket.on('many',(res)=>{
    setOnline(res)
    }) 
    }else{}
  },[tokenName])
  let toggleSwitch=async()=>{
    setChake((n)=>!n)
    let tog=JSON.stringify(!chake)
    console.log(typeof tog,tog)
    await AsyncStorage.setItem('chake',tog)
  }
  //clear all old chat 
  let clear=async()=>{
    try {
  await AsyncStorage.setItem('msg','')
  msg([])
    } catch (e) {}
  }
  //close model
  let close=()=>{
    setModalVisible(!modalVisible)
  }
  return (
    <>
<Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
<View style={styles.fun}>
<AntDesign name="close" size={24} color="#f5d0e0" style={styles.close} onPress={close}/>
<View style={styles.saveCon}>
<Text style={styles.saveText}>Save Chat</Text>
<Switch
  trackColor={{ false: "#767577", true: "#81b0ff" }}
  thumbColor={true ? "#f5dd4b" : "#f4f3f4"}
 onValueChange={toggleSwitch}
        value={chake}
      />
</View>
<TouchableOpacity onPress={clear}>
  <View style={styles.btn}>
  <Text style={styles.btnText}>Clear Chat</Text>
  </View>
</TouchableOpacity>
      
</View>
      </Modal>
    <View style={styles.container}>
<Text style={styles.online}>{online.length}</Text>
<Text style={styles.name}>Chapi</Text>
<TouchableOpacity onPress={close}>
<Image source={logo} style={styles.logo}/>
  </TouchableOpacity> 
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop:25,
    flexDirection: 'row',
     justifyContent: 'space-around',
     alignItems:'center',
    backgroundColor:'#fff',
    height:40
  },logo:{
    width:30,
    height:30
  },name:{
    fontSize:18,
    fontWeight:'700',
    color:'gray'
  },online:{
    fontSize:18,
    fontWeight:'700',
    color:'gray'
  },fun:{
     elevation: 99,
     alignItems:"center",
     justifyContent:"center",
     marginTop:(height/2)-170,
     backgroundColor:"white",
     width:300,
     marginLeft:(width/2)-150,
     borderRadius:20,
     borderWidth:1,
     borderColor:'#f5d0e0',
     height:300
  },saveCon:{
    flexDirection:"row",
    alignItems:'center'
  },btn:{
    backgroundColor:'pink',
    width:100,
    justifyContent:"center",
    alignItems:"center",
    height:40,
    borderRadius:20,
  },btnText:{
  },close:{
    position: 'absolute',
    top:30,
    right:30
  },saveText:{
  }
});
