import { StyleSheet } from 'react-native';
import text from '../parametros/text.js'
import space, { pad15 } from '../parametros/space.js'
import color from '../parametros/color.js'


const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: color.black,
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
    scroll:{
        flex: 1,
        flexDirection: 'column',
    },

    //TOPO SCREEN
    conteudo1:{
        flex: .2,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        borderBottomWidth: 1,
        borderColor: color.purpleBtn,
        marginBottom: space.pad10,
    },
    header:{
        color: color.purple,
        position: 'absolute',
        fontSize: text.size20,
        fontFamily: text.family,
    },
    perfis:{
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        right: space.pad20,
        borderWidth: 2,
        borderColor: color.purpleBtn,
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    iconPerfil:{
        width: space.icoTamanho,
        height: space.icoTamanho,
    },


    //perfil
    conteudo2:{
        flex: .4,
        justifyContent: 'center',
        alignItems:'center',
    },
    perfil:{
        backgroundColor: color.white,
        width: space.perfilWidth,
        height: space.perfilHeight,
        borderRadius: space.perfilRadius,
        justifyContent: 'center',
        alignItems: 'center',
    },
    abreviacao:{
        color: color.black,
        fontSize: text.size50,
        fontFamily: text.family,
    },
    nomePerfil:{
        marginTop: space.pad15,
        color: color.white,
        fontSize: text.size28,
        fontFamily: text.family,
    },

    //input
    conteudo3:{
        flex: .3,
        flexDirection: 'column',
    },
    inputs:{
        flex: 1,
        paddingTop: space.pad20,
        paddingLeft: space.pad30,
        paddingRight: space.pad30,
        gap: 20,
      },
    input:{
        paddingLeft: 5,
        paddingRight: 10,
        borderBottomWidth: 1,
        borderColor: color.purple,
        width: space.widhtInput,
        height: space.heightInput,
        color: color.white,
    },
    textlabel:{
        color: color.white,
    },
    visualizar:{
        position: 'absolute',
        right: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: 30,
        height: '100%',
      },
    recuperar:{
        marginTop: 3,
        paddingRight: 3,
        width: '100%',
        alignItems: 'flex-end',
    },
    //btn
    conteudo4:{
        flex: .5,
        flexDirection: 'column',
        paddingTop: space.pad40,
    },
    btnEntrar:{
        paddingLeft: space.pad30,
        paddingRight: space.pad30,
    },
    
    btn:{
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
        width: space.widthBtn,
        height: space.heightBtn,
        backgroundColor: color.purpleBtn,
        borderRadius: space.radiusBtnInput,
      },
      textBtn:{
        color: color.white,
        fontSize: text.size15,
        fontFamily: text.family,
      },

    //icons
    conteudo5:{
        flex: .3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
    },
    card:{
        gap: 5,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        borderWidth: 1,
        borderColor: color.purpleBtn,
        width: 80,
        height: 60,
        borderRadius: space.radiusBtnInput,
    },
    textCard:{
        fontSize: text.size10,
        color: color.purple,
        fontFamily: text.family,
    },


    //Modal
    centeredView:{
        flex: 1,
        position: 'relative',
        backgroundColor: color.blackTransparent,
    },
    modalContent:{
        flex: 1,
        position: 'relative',
    },
    buttonClose:{
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        top: space.btnFecharTop,
        right: space.btnFecharRight,
        zIndex: 999,
    },
    btnClose:{
        width: 20,
        height: 20,
        zIndex: 999,
    },
    modalView:{
        flex: 1,
    },

    perfisUser:{
        flex: .3,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    titulo:{
        fontSize: text.size28,
        color: color.white,
        fontFamily: text.family,
     
    },
    areaUsers:{
        flex: 1,
        marginTop: space.pad30,
        padding: space.pad15,
    },
    usuarios:{
        borderBottomWidth: 1,
        borderColor: color.purple,
        width: '100%',
        height: 100,
        alignItems: 'center',
        flexDirection: 'row',
        gap: 20,
    },
    usuariosCadastro:{
        borderWidth: 1,
        borderColor: color.purple,
        backgroundColor: color.white,
        width: '100%',
        height: 80,
        borderRadius: 80,
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 20,
        gap: 20,
    },
    perfilUsuario:{
        backgroundColor: color.grayTwo,
        width: 60,
        height: 60,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    perfilCadastro:{
        width: 60,
        height: 60,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    abreviacaoUser:{
        color: color.black,
        fontFamily: text.family,
        fontSize: text.size30,
    },
    nomeUsuario:{
        color: color.white,
        fontFamily: text.family,
        fontSize: text.size28,
    },
    nomeCadastro:{
        color: color.purple,
        fontFamily: text.family,
        fontSize: text.size28,
    },



});

export default styles;