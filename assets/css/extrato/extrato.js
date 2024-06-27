import { StyleSheet } from 'react-native';
import color from '../parametros/color.js'
import space from '../parametros/space.js'
import text from '../parametros/text.js'


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: color.black,
    },
    

    conteudo1: {    
      flex: .15,
      borderBottomWidth: 1,
      borderColor: color.purpleBtn,
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: space.pad20,
      paddingRight: space.pad20,
    },

    header:{
      fontSize: text.size20,
      fontFamily: text.family,
      color: color.purple,
    },

    conteudo2:{
      flex: 1,
    },

    dateHeader:{
      fontSize: text.size13,
      paddingLeft: space.pad15,
      paddingTop: space.pad15,
      color: color.grayOne,
      fontFamily: text.family,
    },

    itemContainer:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    
    boxFaturas:{
      height: 75,
      justifyContent: 'center',
      borderBottomWidth: 1,
      borderColor: color.purpleBtn,
      paddingLeft: space.pad30,
      paddingRight: space.pad30,
    },
    text: {
      fontSize: 20,
      fontFamily: text.family,
      color: color.white,
      width: 250,
    },
    rendaText: {
      fontWeight: 'bold',
      fontSize: text.size20,
      color: color.white,
      fontFamily: text.family,
    },








    modalContainer: {
      flex: 1,
      backgroundColor: 'transparent',

    },
    modalContent: {
      flex: 1,
      borderWidth: 1,
      backgroundColor: color.blackTransparent,
      paddingTop: 150,
      paddingLeft: space.pad30,
      position: 'relative',
      gap: 50,
    },

    closeButton: {
      position: 'absolute',
      padding: 10,
      backgroundColor: color.purple,
      borderRadius: 5,
      top: space.pad20,
      right: space.pad20,
    },

    textModal:{
      color: color.white,
      fontFamily: text.family,
      fontSize: text.size28,
      zIndex: 1,
    },
    
    alinhamento:{
      alignItems: 'center',
      width: '100%',
      position: 'absolute',
      top: space.pad20,
      left: space.pad20,
    },
    logoImg:{
      height: 100,
      width: 235,
      zIndex:0,
    },


    shareButton:{
      position: 'absolute',
      bottom: 100,
      right: 30,
      width: 70,
      height: 70,
      borderRadius: 70,
      backgroundColor: color.purple,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 2,
    },


  });
  
export default styles;