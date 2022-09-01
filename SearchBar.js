import React, {useState, useEffect, useRef} from 'react'
import { Text, Easing, StyleSheet, TextInput, View, Keyboard, Pressable, Animated} from 'react-native'
import  Ionicons  from '@expo/vector-icons/Ionicons';

const usePrevious = (value) => {
    const ref = useRef()
    useEffect(() => {
        ref.current = value
    })
    return ref.current
}

const SearchBar = (props) => {

    const [clicked, setClicked] = useState(false)
    var previous = usePrevious(props.clicked)

    if (previous == true) {
        var x = new Animated.Value(80)
    } else if (previous == false) {
        var x = new Animated.Value(95)
    } else {
        var x = new Animated.Value(95)
    }
    
    var width = x.interpolate({
        inputRange: [0, 100],
        outputRange: ["0%", "100%"]
    })

    useEffect(() => {
        if (!props.clicked) {
            Animated.timing(x, {
                toValue: 95,
                duration: 300,
                useNativeDriver: false,
            }).start()
        } else {
            Animated.timing(x, {
                toValue: 80,
                duration: 300,
                useNativeDriver: false
            }).start()
        }
    })


    // const toggleWidth = () => {
    //     const endWidth = props.clicked ? 95: 80
    //     console.log(width, "to", endWidth)
    //     Animated.timing(width, {
    //         toValue: endWidth,
    //         duration: 200,
    //         easing: Easing.linear,
    //         useNativeDriver: false,
    //     }).start()
    // }

    
    return (
        <View style={styles.container}>
            <Animated.View
                style={
                    !props.clicked ? [styles.searchBar_unclicked, {width: width}] : [styles.searchBar_clicked, {width: width}]
                }   
            >
                <Ionicons 
                    name="search"
                    size={20}
                    color="black"
                    style={{ marginLeft: 1 }}
                />
                <TextInput 
                    style={
                        styles.input
                    }
                    placeholder='search'
                    value={props.searchPhrase}
                    onChangeText={props.setSearchPhrase}
                    onFocus={() => {
                        props.setClicked(true);
                    }}
                />
                {props.clicked && (
                    <Ionicons 
                        name="close"
                        size={20}
                        color="black"
                        style={{ padding: 1 }}
                        onPress={() => {props.setSearchPhrase("")}}
                    />
                )}
            </Animated.View>
            {props.clicked && (
                <View style={{marginLeft: 10}}>
                    <Pressable
                        onPress={() => {
                            Keyboard.dismiss()
                            props.setClicked(false)
                            setClicked(!clicked)
                        }}
                        style={styles.button}
                    ><Text>Cancel</Text></Pressable>
                </View>
            )}
        </View>
    )
}
export default SearchBar

const styles = StyleSheet.create({
    container: {
        // margin: 15,
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        width: "90%",
        marginLeft: 20,
    },
    searchBar_unclicked: {
        padding: 10,
        flexDirection: "row",
        // width: "95%",
        backgroundColor: "#d9dbda",
        borderRadius: 15,
        alignItems: "center",
    },
    searchBar_clicked: {
        padding: 10,
        flexDirection: "row",
        // width: "80%",
        backgroundColor: "#d9dbda",
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "space-between",
    },
    input: {
        fontSize: 20,
        marginLeft: 20,
        width: "80%",
    },
    button: {
        backgroundColor: "#ffc0cb",
        borderRadius: 15,
        padding: 10

    }
})