import React from 'react';
import {StyleSheet, View, Button, Text, FlatList, Pressable} from 'react-native'

const renderItem = ({ item }) => {
    return(
        <View style={styles.items}>
            <Text>{item}</Text>
        </View>
    )
}
const ModalScreen = ({ route, navigation }) => {
    const {data} = route.params;
    // console.log(data)
  
    return (
      <View style={{ flex: 1, alignItems: 'center', paddingTop: 50, justifyContent: 'center'}}>
        <Text style={{ fontSize: 30 }}>These are all the current items in the draw :)</Text>
        <Text>You have {data.length} items</Text>
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item}
            ItemSeparatorComponent={() => (
                <View  
                    style={{marginVertical: 0}}
                
                />
            )}
            style={styles.list}
            numColumns={2}
        />

        <Pressable 
            onPress={() => navigation.goBack()} 
            style={styles.button}
        >   
                <Text>Return</Text>
        </Pressable>
      </View>
    );
  }

export default ModalScreen

const styles = StyleSheet.create({
    items: {
        padding: 15,
        borderRadius: 15,
        backgroundColor: "pink",
        alignItems: "center",
        marginHorizontal: 5,
        marginVertical: 10
    },
    list: {
        backgroundColor: "plum",
        flexGrow: 0,
        marginVertical: 10,
    },
    button: {
        borderRadius: 15,
        backgroundColor: "pink",
        padding: 15,
    }
})