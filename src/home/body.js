import { StyleSheet, Text, View,Dimensions,Image } from 'react-native';
let {width,height}=Dimensions.get('window')
export default function Body({own,data}) {
  
  return (
    <View style={[styles.container,
     own?styles.own:styles.not 
   ] }>
    <View style={[styles.main,
    own?styles.my:styles.op]}>
   {!data.base?<Text style={styles.msg}>{data.text}</Text>:
    <Image source={{uri:data.base}} style={styles.img}/>
   }
     <Text style={styles.holder}>{data.username}</Text>
     </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width:width,
    flex:1,
    paddingBottom:20
  },msg:{
   alignSelf:'flex-end' 
  },holder:{
    fontSize:8,
    marginBottom:5
  },own:{
    alignItems: 'flex-end',
    
  },not:{
    alignItems:'flex-start'
  },main:{
    minHeight:40,
    justifyContent:'center',
    minWidth:50,
    maxWidth:width-50,
    paddingLeft:10,
    paddingRight:10,
    borderRadius:20,
  },my:{
    marginRight:5,
    backgroundColor:'#fed0d8'
  },op:{
    marginLeft:5,
    backgroundColor:'#87fafa'
  } ,img:{
    width: width-70,
    height: 250,
    resizeMode: 'contain',
    borderRadius:10,
    marginTop:10
  }
});
    