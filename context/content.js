import {useState,useEffect}from'react'
import context from'./context'
import AsyncStorage from '@react-native-async-storage/async-storage';
import io from "socket.io-client";
let socket=io('https://kittybackapp.herokuapp.com/') 
export default function Context({children}) {
  let [token,setToken]=useState(true);
  let [tokenName,setTokenName]=useState('');
  let [chake,setChake]=useState(false);
  //chake user have name or not
  useEffect(()=>{
  async function call() {
      try {
    let res=await AsyncStorage.getItem('token')
    if (res) {
      setToken(true)
      setTokenName(res)
      console.log('token name',res)
    }else{
      setToken(false)
      console.log('data not got')
    }
    } catch (e) {
      alert(e)
    }
    };call()
  },[])
  //chake save true or false
  useEffect(()=>{
  async function chake() {
    try {
   let saveChake=await AsyncStorage.getItem('chake')
   let parse=JSON.parse(saveChake)
   if (saveChake) {
     setChake(parse)
   }else{
     await AsyncStorage.setItem('chake','true')
     setChake(true)
   }
    } catch (e) {}
  };chake()
  },[])
  
  return (
  <context.Provider value={{
    token,setToken,setTokenName,tokenName,socket,chake,setChake
  }}>
  {children}
  </context.Provider>
  );
}

