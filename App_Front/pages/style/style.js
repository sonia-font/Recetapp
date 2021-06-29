import { StyleSheet } from 'react-native';
import Constants from 'expo-constants'

const ReceAppstyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container_transparent: {
        backgroundColor: 'transparent',
        marginTop: Constants.statusBarHeight
    },
    title: {
        fontSize: 50,
        marginBottom: 2,
        marginTop: 30,
        color: 'white'    
    },
    imagesRece: {
        width:100,
        height: 120,
        borderRadius: 20,
        marginTop: 10,
        marginRight: 10
    },
    big_imagesRece: {
        width:220,
        height: 180,
        borderRadius: 20,
    },
    big_btn:{
      width: 310,
      height: 180,
      borderRadius: 12,
      borderWidth: 0,
      marginBottom: 10,
      padding: 10
    },
    card:{
        width: 330,
        minHeight: 160,
        borderRadius: 12,
        borderWidth: 0,
        marginBottom: 10,
        padding: 10,
        flex: 1, 
        flexDirection: 'row',
        opacity : 0.95,
        paddingTop: 10
    },
    small_btn: {
        width: 310,
        height: 65,
        borderRadius: 12,
        borderWidth: 0
    },
    bcg_green: {
        backgroundColor: '#90AF16'
    },
    bcg_red: {
        backgroundColor: '#D82D40'
    },
    bcg_blue: {
        backgroundColor: '#40A3B8'
    },
    background: {
        backgroundColor: '#efecffef'
    },
    bcg_red_gmail: {
        backgroundColor: '#EA4335'
    },
    bcg_blue_gmail: {
        backgroundColor: '#4285F4'
    },
    text_titulo:{
      color: '#efecff',
      fontSize: 25,
      fontWeight: 'bold'
    },
    text_paragraph:{
      color: '#efecff',
      fontSize: 15,
      textAlign: 'left'
    },
    text_titulo_card:{
        color: 'black',
        fontSize: 17,
        fontWeight: 'bold',
        marginBottom: 2
      },
    image: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center'
    }
  })

  export default ReceAppstyles