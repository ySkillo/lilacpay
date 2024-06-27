import { StyleSheet } from 'react-native';
import text, { size25 } from '../parametros/text.js'
import space, { pad15, pad20 } from '../parametros/space.js'
import color from '../parametros/color.js'


const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
        borderWidth: 1,
        borderColor: color.black,
        backgroundColor: color.black,
        position: 'relative',

    },
    

    testeFaturas:{
        position: 'absolute',
        top: 50,
        width: '100%',
        height: '100%',
        backgroundColor: color.white,
        zIndex: 999,
        gap: 20,
    },
    testeText:{
        color: '#f00',
        fontSize: 20,
        paddingLeft: 10,
        paddingTop: 5,
    },
    testeInfo:{
        paddingTop: 5,
        paddingLeft: 20,
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
    conteudo1: {
        flex:.2,
        borderBottomWidth: 1,
        borderColor: color.purple,
        justifyContent:'flex-end',
        alignItems: 'center',
        backgroundColor: color.purple,
    },
    topo:{
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: space.pad20,
        paddingLeft: space.pad20,
        paddingRight: space.pad20,
        
    },
    icoConNav:{
        alignItems: 'center',
        justifyContent: 'center',
        width: 30,
        height: 30,
    },
    logo:{
        color: color.white,
        fontSize: text.size20,
        fontFamily: text.family,
    },

    conteudo2: {
        flex:.3,
        justifyContent: 'center',
        paddingLeft: space.pad20,
        backgroundColor: color.purple,
    },

    infoUser:{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
    },

    perfil:{
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        height: 80,
        borderRadius: 80,
        backgroundColor: color.white,
        borderWidth: 1,
        borderColor: color.purple,
    },
    abreviacao:{
        fontSize: text.size35,
        fontFamily: text.family,
        color: color.black,
    },
    nomeAlinamento:{
        flexDirection: 'column',
    },
    nomeUser:{
        fontSize: text.size25,
        fontFamily: text.family,
        color: color.white,
        width: 300,
    },
    textEmail:{
        color: color.white,
        fontSize: text.size13,
        fontFamily: text.family,
    },


    conteudo3: {
        flex:.2,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        backgroundColor: color.purple,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: space.pad20,
        paddingRight: space.pad35,
    },
    boxLabel:{
        flexDirection: 'column',  
        borderBottomWidth: 1,
        borderColor: color.grayTwo,
    },
    label:{
        color: color.white,
        fontSize: text.size10,
        fontFamily: text.family,
    },
    textRenda:{
        color: color.white,
        fontSize: text.size28,
        fontFamily: text.family,
    },

    temporario:{
        color: color.white,
        fontSize: text.size28,
        fontFamily: text.family,
    },



    conteudo4: {
        flex:.3,
        borderBottomWidth: 1, 
        borderColor: color.purple,
        borderRadius: 30,
    },
    

    opcoes:{
        
        height: '100%',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 30,
        paddingLeft: space.pad20,
        paddingRight: space.pad20,
    },

    containerOp:{
        height: 100,
        position: 'relative',
        alignItems: 'center',
        
    },
    opcao:{
        width: 80,
        height: 80,
        borderRadius: 80,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.grayTwo,
    },
    iconsImg:{
        width: 60,
        height: 60,
    },
    textOpcao:{
        position: 'absolute',
        color: color.black,
        fontSize: text.size13,
        fontFamily: text.family,
        bottom: -2,
        color: color.white,
    },



    conteudo5: {
        flex:.4,
        flexDirection: 'column',
        padding: 10,
    },
    titulo:{
        color: color.white,
        fontSize: text.size15,
        marginBottom: 10,
        margin: 10,
    },
    cards:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: space.pad20,
        paddingRight: space.pad20,
    },
    card:{
        flex: 1,
        overflow: 'hidden',
        width: 380,
        height: '100%',
        borderRadius: 10,
        backgroundColor: color.white,
        flexDirection: 'row',
        position: 'relative',
    },
 
    textosCard:{
        width: 230,
        justifyContent: 'center',
        paddingLeft: space.pad20,
        paddingRight: space.pad10,
        gap: 15,
    },
    textCard:{
        color: color.purple,
        fontSize: text.size15,
    },
    span:{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    setaImg:{
        width: 5,
        height: 10,
    },
    imgCard:{ 
        position: 'absolute',
        right: 0,
        width: 150,
        height: '100%',
    },

   
    conteudo6: {
        flex:.7,
        flexDirection: 'column',
    },
    services:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        
    },

    servicos:{
        width: 50,
        height: 80,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },

    textServicos:{
        textAlign: 'center',
        color: color.white,
        fontSize: text.size13,
        position:'absolute',
        bottom: -0,
        width: 200,
    },
});

export default styles;