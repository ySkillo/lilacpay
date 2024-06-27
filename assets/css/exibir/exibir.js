import { StyleSheet } from 'react-native';
import text from '../parametros/text.js'
import space, { heightInput } from '../parametros/space.js'
import color from '../parametros/color.js'


const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: color.black,
        flexDirection: 'column',
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
    rendaText:{
        color: color.purple,
        fontSize: text.size20,
        marginBottom: 30,
        marginLeft: 20,
        textDecorationLine: 'underline',
        textDecorationColor: color.purple,
        fontFamily: text.family,
    },
    textContainer:{
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginBottom: 30,
        marginLeft: 20,
        gap: 5,
    },
    label:{
        color: color.grayOne,
        fontSize: text.size30,
        fontFamily: text.family,
    },
    labelValor:{
        color: color.grayOne,
        fontSize: text.size30,
        fontFamily: text.family,
    },
    preco:{
        color: color.white,
        fontSize: text.size50,
        fontFamily: text.family,
        textDecorationLine: 'underline',
        textDecorationColor: color.white,
        marginBottom: -5,
    },
    otherText:{
        color: color.white,
        fontSize: text.size20,
        marginBottom: 3,
        fontFamily: text.family,
    },

  

    conteudo1:{
        flex: .2,
        alignItems:'center',
        justifyContent: 'center',
    },
    logo:{
        color: color.purple,
        fontSize: text.size35,
    },
    conteudo2:{
        flex: .8,
        paddingTop: space.pad40,
    },

    inputs:{
        paddingLeft: space.pad40,
        paddingRight: space.pad40,
        marginTop: space.pad10,
        position: 'relative',
    },

    input:{
        borderWidth: 1,
        borderColor: color.purple,
        width: space.widhtInput,
        height: 70,
        fontSize: text.size30,
        color: color.white,
        paddingLeft: 50,
        borderRadius: space.radiusBtnInput,
    },
    rs:{
        position: 'absolute',
        color: color.white,
        fontSize: text.size30,
        left:50,
        top: 15,
    },
    btnEnviar:{
        position: 'absolute',
        right: 0,
        width: 80,
        height: 70,
        borderTopRightRadius: space.radiusBtnInput,
        borderBottomRightRadius: space.radiusBtnInput,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.purple,
       marginRight: space.pad30,
    },











    conteudo3:{
        flex: .3,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    btn:{
        width: 80,
        height: 80,
        borderRadius: 80,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.purple,
       marginRight: space.pad30,
    },




    modalContainer: {
        flex: 1,
    },
    modalContent: {
        flex: 1,
        backgroundColor: color.black,
    },
    conteudoModal1:{
        flex: .2,
        alignItems: 'flex-end',
        paddingLeft: 20,
        gap: 6,
        flexDirection: 'row',
    },
    modalTitle:{
        fontSize: text.size25,
        color: color.white,
    },
    modalTitle2:{
        fontSize: text.size25,
        color: color.purple,
    },


    modalText: {
        fontSize: 16,
        marginBottom: 20,
    },
    codigoContainer: {
        flexDirection: 'row',
        flex: .2,
        alignItems: 'center',
        paddingLeft: space.pad20,
        gap: 10,
    },
    modalInput: {
        borderWidth: 1,
        borderColor: color.grayOne,
        color: color.white,
        borderRadius: 5,
        textAlign: 'center',
        width: 60,
        height: 60,
        fontSize: text.size28,
    },
    alinhamento:{
        flex: .2,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        flexDirection: 'row',
        gap: 20,
    },

    modalBtn:{
        backgroundColor: color.purple,
        justifyContent: 'center',
        alignItems: 'center',
        width: 70,
        height: 70,
        borderRadius: 70,
    },  
    
    clearBtn:{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.purple,
        width: 100,
        height: 70,
        borderRadius: 70,
    },
    clearBtnText:{
        color: color.white,
        fontFamily: text.family,
        fontSize: text.size15,
    },
});

export default styles;