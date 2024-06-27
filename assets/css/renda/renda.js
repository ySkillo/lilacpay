import { StyleSheet } from 'react-native';
import color from '../parametros/color.js'
import space, { pad35 } from '../parametros/space.js'
import text from '../parametros/text.js'


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: color.black,
    },
    box:{
    backgroundColor: color.white, 
    height: 200, 
    },
    conteudo1:{
        flex: .3,
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        paddingLeft: space.pad20,
        paddingBottom: space.pad15,
        gap: 5,
    },  
    btnVoltar:{
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        top: space.btnFecharTop,
        left: space.btnFecharRight,
    },
    icoVoltar:{
        width: 20,
        height: 20,
    },
    text1:{
        color: color.white,
        fontSize: text.size28,
    },
    text2:{
        color: color.purple,
        fontSize: text.size28,
    },



    conteudo2:{
        flex: 1,
        paddingTop: space.pad40,
        paddingLeft: space.pad20,
        paddingRight: space.pad20,

    }, 
    inputs:{
        width: space.widhtInput,
        position:'relative',
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    input:{
        width: space.widhtInput,
        height: space.heightInput,
        color: color.white,
        borderWidth: 1,
        borderColor: color.purple,
        paddingLeft: space.pad10,
        paddingRight: space.pad15,
        borderRadius: space.radiusBtnInput,
    },
    label:{
        color: color.white,
        fontSize: text.size15,
    },

    btn:{
        marginTop: space.pad40,
        alignItems: 'center',
        justifyContent: 'center',
        width: space.widthBtn,
        height: space.heightBtn,
        borderRadius: space.radiusBtnInput,
        backgroundColor: color.purpleBtn,
    },
    textBtn:{
        fontFamily: text.family,
        fontSize: text.size15,
        color: color.white,
    },
 
});

export default styles;