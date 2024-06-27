  import { StyleSheet } from 'react-native';
  import color from '../parametros/color.js'
  import space from '../parametros/space.js'
  import text from '../text.js'


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: color.black,
      position: 'relative',
    },
    loading:{
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      backgroundColor: color.loading,
      zIndex: 999,
    },
    conteudo1:{
      flex: .5,
      justifyContent: 'center',
      paddingLeft: 20,
      borderBottomWidth: 1,
      borderColor: color.purple,

    },
    logo:{
      color: color.purple,
      fontSize: text.logo,
      fontWeight: text.weightOne,
      fontFamily: text.textFont,
    },
    // text title
    conteudo2:{
      justifyContent: 'center',
      flex: .6,
      gap: 10,
      paddingLeft: 20,
      paddingRight: 20,
    },
    titulo:{
      marginTop: 40,
      color: color.grayTwo,
      fontSize: text.tituloOne,
      fontFamily: text.textFont,
    },
    descricao:{
      fontSize: text.descricao,
      color: color.grayTwo, 
      fontFamily: text.textFont,
    },

    conteudo3:{
      justifyContent: 'center',
      alignItems: 'center',
      flex: .5,
      paddingLeft: text.paddingBtn,
      paddingRight: text.paddingBtn,
    },
    btn:{
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10,
      width: text.widthBtn,
      height: text.heightBtn,
      backgroundColor: color.purpleBtn,
      borderRadius: text.radius,
    },
    textBtn:{
      color: color.white,
      fontSize: text.textBtn,
      fontFamily: text.textFont,
    },
    conteudo4:{
      flex: 1.5,
      alignItems: 'flex-end',
      overflow: 'hidden',
    },
    img:{
      width: text.celularWidht,
      height: text.celularHeight,
    },




    centeredView:{
      flex: 1,
      position: 'relative',
      backgroundColor: color.black,
    },
    buttonClose:{
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      top: space.btnFecharTop,
      right:space.btnFecharRight,
      width: 50,
      height: 50, 
      zIndex: 10,
    },
    btnClose:{
      width: 20,
      height: 20,
    },
    modalView:{
      flex: 1,
      flexDirection: 'column',
    },
    tituloCad:{
      flex: .2,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    tituloTwo:{
      fontSize: text.tituloTwo,
      fontFamily: text.textFont,
      color: color.white,
    },
    inputs:{
      flex: 1,
      paddingTop: 40,
      paddingLeft: text.paddingInput,
      paddingRight: text.paddingInput,
      gap: 20,
    },
    input:{
      paddingLeft: 13,
      paddingRight: 10,
      borderWidth: 1,
      borderColor: color.purple,
      width: text.inputWidht,
      height: text.inputHeight,
      borderRadius: text.radius,
      color: color.white,
    },
    inputSenha:{
      paddingLeft: 13,
      paddingRight: 50,
      borderWidth: 1,
      borderColor: color.purple,
      width: text.inputWidht,
      height: text.inputHeight,
      borderRadius: text.radius,
      color: color.white,
    },
    textlabel:{
      color: color.white,
    },
    modalContent: {
      flex: 1,
      justifyContent: 'center',
    },

    visualizar:{
      position: 'absolute',
      right: 10,
      justifyContent: 'center',
      alignItems: 'center',
      width: 30,
      height: '100%',
    },

    // imagemTirada:{
    //   borderWidth: 1,
    //   width: 400,
    //   height: 400,
    //   borderColor: color.white,
    // },


    autorizacao:{
      flexDirection: 'row',
      alignItems: 'center',
      gap: 15,
      paddingRight: 20,
    },
    textCheck:{
    fontSize: 13, 
    color: color.white,
    fontFamily: text.textFont,
    },

    checkbox: {
      width: 30,
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: text.radius,
      borderWidth: 2,
      borderColor: color.purpleBtn,
      justifyContent: 'center',
      alignItems: 'center',
    },
    checked: {
      backgroundColor: color.purpleBtn,
    },
    checkmark: {
      color: color.white,
      fontSize: 16,
    },
    btnCadastro:{
      marginTop: 20,
    },
    span:{
      justifyContent: 'center',
      marginTop: 20,
      paddingBottom: 40,
      alignItems: 'center',
      flexDirection: 'row',
      gap: 5,
    },
    loginOne:{
      color: color.white,
      fontSize: 15,
    },
    loginTwo:{
      color: color.purple,
      fontSize: 15,
    },


  


    boxFoto:{
      flex: .6,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 40,
    },  

    foto:{
      overflow: 'hidden',
      borderWidth: 3,
      borderColor: color.purpleBtn,
      width: 280,
      height: 280,
      borderRadius: 320,
      justifyContent: 'center',
      alignItems: 'center',
    },
    imagemVerificada:{
      width: '100%',
      height: '100%',
    },

    textoFoto:{
      paddingTop: 20,
      paddingLeft: 40,
      paddingRight: 40,
      gap: 10,
      flexDirection: 'column',
      flex: .3,
    },

    boxBtn:{
      flex: .2,
      paddingTop: text.paddingBtn,
      paddingLeft: text.paddingBtn,
      paddingRight: text.paddingBtn,
    },

  });

  export default styles;