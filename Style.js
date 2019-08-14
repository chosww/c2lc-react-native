import { StyleSheet, Dimensions } from 'react-native';

const entireScreenWidth = Dimensions.get('window').width;
const entireScreenHeight = Dimensions.get('window').height;
// https://medium.com/@shanerudolfworktive/7-tips-to-develop-react-native-uis-for-all-screen-sizes-7ec5271be25c
const rem = entireScreenWidth / 380;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        paddingTop: '15%',
        alignItems: 'flex-start'
    },
    programTextEditorContainer: {
        flex: 1,
        width: entireScreenWidth*0.3,
        height: 100
    },
    programTextEditor: {
        flexDirection: 'row',
        flex: 1,
        width: '100%',
        height: '100%'
    },
    editorSelector: {
        flex: 1,
        width: 50,
        height: 50
    },
    screen: {
        borderRadius: 1,
        borderWidth: 0.15*rem,
        borderColor: '#555',
        flex: 4,
        width: entireScreenWidth*0.7,
        height: entireScreenHeight,
        alignSelf: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        flex: 0.5,
        width: '42%',
        height: 'auto'
    },
    button: {
        flex: 1,
        width: '14%',
        height: 'auto',
    },
    footer: {
        flex: 1,
        width: '100%',
        height: 'auto'
    }
});

export { styles }