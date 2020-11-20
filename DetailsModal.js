import React from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native'

const DetailsModal = (props) => {
    const data = JSON.stringify(props.data)
    console.log(data)
    return (
        <View style={styles.details}> 
            <TouchableOpacity style={styles.backBtn} onPress={() => props.back(false)}>
                <Text>Back</Text>
            </TouchableOpacity>
            <View style={styles.header}>
                <Text style={{fontSize: 20}}>Raw json content</Text>
            </View>
            <View style={styles.content}> 
            <Text>{data.toString()}</Text>   
            </View>
        </View>
    )
}

const {width, height} = Dimensions.get('window')
const styles = StyleSheet.create({
    details: {
        width,
        height,
        justifyContent: "center",
        alignItems: 'center'
    },
    backBtn: {
        position: 'absolute',
        left: 20,
        top: 20,
        borderBottomColor: '#333',
        borderBottomWidth: 2,
        paddingHorizontal: 5
    },
    header: {
        marginBottom: 30,
        alignItems: 'center'
    },
    content: {
        padding: 30
    }
})
export default DetailsModal
