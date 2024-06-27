import { StyleSheet } from 'react-native';
import text from '../parametros/text.js'
import space from '../parametros/space.js'
import color from '../parametros/color.js'


const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: color.black,
    },
    conteudo1:{
        flex: .2,
        borderBottomWidth: 1,
        borderColor: color.purple,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: space.pad20,
        paddingRight: space.pad20,
    
    },
    headerText:{
        fontSize: text.size20,
        color: color.purple,
        fontFamily: text.family,
    },
    conteudo2:{
        flex: .4,
        flexDirection: 'column',
        padding: space.pad15,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 15,
    },
    box:{
        backgroundColor: color.purple,
        width: space.widhtInput,
        height: 70,
        borderRadius: space.radiusBtnInput,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: space.pad20,
        paddingRight: space.pad20,
    },
    alinhamento:{
        gap: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    textSelecao:{
        fontSize: text.size20,
        color: color.white,
        fontFamily: text.family,
    },
    conteudo3:{
        flex: .4,
    },
    titulo: {
        fontSize: text.size15,
        color: color.white,
        fontFamily: text.family,
        marginLeft: space.pad20,
        marginTop: space.pad30
    },
    opcoes:{
        flex: 1,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 20,
        marginRight: 20,
        gap: 20,
    },

    cards:{
        backgroundColor: color.purpleBtn,
        justifyContent: "center",
        alignItems: "center",
        width: 70,
        height: 70,
        borderRadius: 70,
        position: "relative",
    },
    textCard:{
        position: "absolute",
        color: color.white,
        bottom: -40,
        fontSize: text.size13,
        textAlign: "center",
        fontFamily: text.family,

    },


    conteudo4:{
        flex: 1,

    },


    boxSlogan:{
        flexDirection: "row",
        flex: .7,
        borderWidth: 1,
        borderColor: color.purpleBtn,
        margin: 20,
        marginTop: 30,
        borderRadius: 10,
        paddingTop: 30,
        paddingLeft: 15,
    },
    tituloSlogan:{
        color: color.white,
        fontSize: text.size25,
        fontFamily: text.family,
        width: 150,
  

    },
    textSlogan:{
        color: color.white,
        fontSize: text.size13,
        fontFamily: text.family,
        width: 170,
        marginTop: 10,
    },
    btn:{
        backgroundColor: color.purpleBtn,
        marginTop: 35,
        width: 100,
        height: 35,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    textBtn:{
        color: color.white,
        fontSize: text.size13,
        fontFamily: text.family,
    },
    imgBox:{
        width: 200,
        justifyContent: 'center',
        alignItems: 'center',
        height: 180,
    },
    
    imagem:{
        width: 180,
        height: 170,
    },

});

export default styles;