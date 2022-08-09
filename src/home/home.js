import { StyleSheet, Text, View,ScrollView,ActivityIndicator} from 'react-native';
import Context from "../../context/context";
import { useContext, useState, useEffect,useRef} from "react";
import Head from'./head'
import Body from'./body'
import Foot from'./foot'
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Home({navigation}) {
  let {token,socket,tokenName,chake}=useContext(Context)
  let scrollView=useRef()
  let [msg,setMsg]=useState([])
  let [connect,setConnect]=useState(false)
  let [online,setOnlie]=useState([])
  //get all old msg function
  async function oldMsg() {
    try {
      let old=await AsyncStorage.getItem('msg')
      let parse=JSON.parse(old)
      if (old) {
      setMsg(parse)
      }else{}
    } catch (e) {
    alert(e)  
    }
  }
  //get old msg's useEffect
useEffect(()=>{
  oldMsg()
},[])
  //navigation
useEffect(()=>{
  if (token) {
      navigation.navigate('Home');
    } else {
      navigation.navigate('Auth');
    }
},[token])
//socket
useEffect(()=>{
 if (tokenName) {
   socket.on('online',(res)=>{
   setConnect(res)
 })
 socket.emit('join',tokenName)
 
 socket.on('show',(res)=>{
  setMsg(old=>[...old,res])
 // console.log('res',res)
});
 }else{
   
 }
},[tokenName])
//save all msg to AsyncStorage
useEffect(()=>{
 async function save() {
   if (chake) {
     try {
  let res=await AsyncStorage.setItem('msg',JSON.stringify(msg))
   } catch (e) {}
   }else{}
 };save() 
},[msg])
//console.log(msg)
  return (
    <>{connect?
    <View style={styles.container}>
<Head msg={setMsg}/>
<ScrollView 
ref={scrollView}
onContentSizeChange={() =>
scrollView.current.scrollToEnd({animated: true})}>


<View style={styles.scv}></View>
{
  msg.map((e,i)=>(
  <Body key={i} data={e}
  own={tokenName==e.username?true:false}/>
  ))
}
<View style={styles.topp}></View>
</ScrollView>
<Foot/>
    </View>
    :
    <View style={styles.loadCon}>
      <ActivityIndicator size={60} color="#00ff00" 
      style={styles.load}/>
      </View>
    }</>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },scv:{
    height:10
  },topp:{
    height:50
  },loadCon:{
    flex:1,
    alignItems: "center",
    justifyContent: "center",
  }
});
