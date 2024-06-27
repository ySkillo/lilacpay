import { StyleSheet } from 'react-native';
import text from '../parametros/text.js'
import space from '../parametros/space.js'
import color from '../parametros/color.js'


const styles = StyleSheet.create({
container:{
    flex: 1,
    backgroundColor: color.black,
    position: 'relative',
},

conteudo1: {
    flex: .2,
    alignItems: 'center',
    paddingTop: space.pad30,
    position: 'relative',
},

header:{
    color: color.purple,
    position: 'absolute',
    fontSize: text.size20,
    top: 50,
    fontFamily: text.family,
},
buttonClose:{
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: space.pad40,
    left: space.pad30,
    width: 50,
    height: 50, 
    zIndex: 10,
  },
btnClose:{
    width: 20,
    height: 20,
    top: space.btnFecharTop,
    right: space.btnFecharRight,
},


// Titulo
conteudo2: {
    flex: .3,
    alignItems: 'center',
    justifyContent: 'center',
},
titulo: {
    fontSize: text.size28,
    padding: space.pad40,
    color: color.white
},


conteudo3: {
    flex: .5,
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
  recuperar:{
    marginTop: 3,
    paddingRight: 3,
    width: '100%',
    alignItems: 'flex-end',
  },
  visualizar:{
    position: 'absolute',
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: '100%',
  },

conteudo4: {
    flex: .2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: space.pad35,
    paddingRight: space.pad30,
    paddingLeft: space.pad30,
},
    scroll:{
        flex: 1,
    },

autorizacao:{
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
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
    borderRadius: space.radiusBtnInput,
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
conteudo5: {
    flex: .5,
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
  loading:{
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: color.loading,
    zIndex: 999,
  },


});

export default styles;