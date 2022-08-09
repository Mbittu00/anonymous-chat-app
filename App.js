import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer,useRoute } from '@react-navigation/native';
import {useState,useEffect}from'react'
import Content from'./context/content'
import Root from'./root'
export default function App() {
  
  return (
    <NavigationContainer>
    <Content>
     <Root/>
      </Content>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  
});
