import React, { useState, useEffect, useRef } from "react";
import { FlatList, StyleSheet, Pressable, Text, View, Animated } from 'react-native';
import  Ionicons  from '@expo/vector-icons/Ionicons';

// instead of a randomizer, I'll make it so each item is encapsulated in some image (think: gift)
// and the positions are randomized. The user has to tap one of them to see what they get
// It'll be like a game and it's like loot boxes lmao
const randomNumber = () => (
    (Math.floor(Math.random() * 20) + 3) * 1000
)
const AnimatedPressable = Animated.createAnimatedComponent(Pressable)
const Item = ({ item }) => {
    const shakeValue = new Animated.Value(0)
    var shake = shakeValue.interpolate({
        inputRange: [0, 360],
        outputRange: ['0deg', '360deg']
    })

    const Animation = () => {
        Animated.sequence([
            Animated.timing(shakeValue, { toValue: 20, duration: 300, useNativeDriver: true}),
            Animated.timing(shakeValue, { toValue: -20, duration: 300, useNativeDriver: true}),
            Animated.timing(shakeValue, { toValue: 20, duration: 300, useNativeDriver: true}),
            Animated.timing(shakeValue, { toValue: 0, duration: 300, useNativeDriver: true})
        ]).start()
    }   

    useEffect(() => {
        setInterval(() => {
            Animation()
        }, randomNumber())
        
    }, [])

    return(
        <AnimatedPressable 
            style={[styles.items, {transform: [{rotateZ: shake}]}, ({pressed}) => pressed ? {transform: [{scale: 2}]} : {}]}                
            onPress={() => {console.log(item)}}
        >
            <Ionicons name="fast-food-outline" size={40} />
        </AnimatedPressable>
    )
}
const renderItem = ({ item }) => {

    return (
        <Item
            item={item}
        />
    )
}
const RandomScreen = ({ route, navigation }) => {
    const {data} = route.params
    const randomedData = data.sort(() => 0.5 - Math.random())
    // console.log(temp)
    // const data = temp.sort(() => Math.random() - 0.5)
    var columns = 3

    return (
        <View style={styles.container}>
            <Text>There are <Text style={styles.emphasis}>{randomedData.length}</Text> items to choose from</Text>
            <Text>Tap any of the presents to see what you draw :)</Text>
            <FlatList
                data={randomedData}
                renderItem={renderItem}
                keyExtractor={item=>item}
                numColumns={columns}
                ItemSeparatorComponent={() => (
                    <View 
                        style={{ paddingVertical: 0}}
                    
                    />
                )}
                style={styles.list}
            />
            <Pressable
                onPress={() => navigation.navigate("MyModal", {
                    data: randomedData,
                })}
                style={({ pressed }) => [styles.button, pressed ? { opacity: 0.9 } : {}]}
            >
                <Text>Check selection</Text>
            </Pressable>
        </View>
        
    )
}
export default RandomScreen

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: "powderblue",
        height: "100%",
    },
    emphasis: {
        color: "pink",
        fontSize: 20,

    },

    button: {
        backgroundColor: "pink",
        borderRadius: 15,
        padding: 15,
    },
    items: {
        borderRadius: 20,
        padding: 5,
        borderColor: "pink",
        borderWidth: 2,
        marginHorizontal: 10,
        marginVertical: 5
        // backgroundColor: "powderblue",
    },
    list: {
        marginVertical: 10,
        paddingBottom: 20,
        paddingTop: 20,
        // backgroundColor: "plum",
        flexGrow: 0
    }
})