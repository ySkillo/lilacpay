import { StyleSheet } from 'react-native';
import color from '../parametros/color.js'
import space, { pad30, pad35 } from '../parametros/space.js'
import text from '../parametros/text.js'


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: color.black,
    },
    conteudo1:{
        flex: .2,
        paddingTop: space.pad30,
        paddingLeft: space.pad30
    },
    conteudo2:{
        flex: .1,
        flexDirection: 'row',
        gap: 5,
        paddingLeft: space.pad30,
    },
    text1:{
        color: color.white,
        fontSize: text.size25,
        fontFamily: text.family,
    },
    text2:{
        color: color.purple,
        fontSize: text.size25,
        fontFamily: text.family,
    },
    conteudo3:{
        flex: 1,
    },
    codigoContainer:{
        flexDirection: 'row',
        gap: 15,
        paddingTop: space.pad15,
        paddingLeft: space.pad30,
    },
    codigoInput:{
        borderWidth: 1,
        borderColor: color.grayOne,
        width: 60,
        height: 60,
        borderRadius: 10,
        color: color.white,
        fontSize: text.size30,
        textAlign: 'center',
        fontFamily: text.family
    },

    btnEnviarCod:{
        position: 'absolute',
        backgroundColor: color.purple,
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        height: 80,
        borderRadius: 10,
        marginTop: 200,
        right: 30,
    },
});

export default styles;