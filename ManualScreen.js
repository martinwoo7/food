import React, {useRef, useState, useEffect} from "react";
import { StyleSheet, Pressable, Text, View, Animated, Button} from 'react-native';
import List from './List';
import SearchBar from './SearchBar';

var saved = []
const numberRange = Array(10).fill().map((x, i) => i)
const getPosition = (value, height) => parseInt(value, 10) * height * -1;
const getTranslateStyle = position => ({
    transform: [
        {
            translateY: position,
        }
    ]
})

const getRandom = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const usePrevious = (value) => {
    const ref = useRef()
    useEffect(() => {
        ref.current = value
    })
    return ref.current
}

const Tick = (props) => {
    const {value, height} = props
    var previous = usePrevious({value, height})
    if (previous == undefined) {
        var animate = new Animated.Value(0)
    } else {
        var animate = new Animated.Value(getPosition(previous.value, previous.height))
    }

    useEffect(() => {
        animate = new Animated.Value(getPosition(value, height))
    }, [])

    useEffect(() => {
        Animated.timing(
            animate, {
                toValue: getPosition(value, height),
                duration: 300,
                useNativeDriver: true,
            }
        ).start()
    }, [value])

    const transformStyle = getTranslateStyle(animate)
    return(
        <Animated.View style={transformStyle}>
            {numberRange.map(v => {
                return (
                    <Text key={v} style={styles.text}>
                        {v}
                    </Text>
                )
            })}
        </Animated.View>
    )
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const ManualScreen = ({route, navigation}) => {
    
    const {data} = route.params
    const [searchPhrase, setSearchPhrase] = useState("")
    const [clicked, setClicked] = useState(false)
    const [fakeData, setFakeData] = useState()

    const [first, setFirst] = useState(0)
    const [second, setSecond] = useState(0)

    const [measured, setMeasured] = useState(false)
    const [height, setHeight] = useState(0)

    const [buttonDisabled, setButtonDisabled] = useState(true)

    var previous = usePrevious(buttonDisabled)
    if (previous == undefined) {
        var x = new Animated.Value(0)
    } else if (previous) {
        var x = new Animated.Value(0)
    } else if (!previous) {
        var x = new Animated.Value(300)
    }

    const save = (item) => {
        if (saved.indexOf(item) > -1) {
            saved.splice(saved.indexOf(item), 1)
        } else {
            saved.push(item)
        }
        var loop = saved.length
        if (loop % 10 == 0) {
            // if we're on a boundary of 10
            let b = loop / 10
            
            setFirst(b)
            setSecond(0)
        }
        else {
            let a = loop % 10
            setSecond(a)
        }

        if (loop == 0) {
            setButtonDisabled(true)
        } else {
            setButtonDisabled(false)
        }
    }

    const handleLayout = (e) => {
        setMeasured(true)
        setHeight(e.nativeEvent.layout.height)
    }

    useEffect(() => {
        // console.log("inside useeffect")
        const setData = async () => {
            saved = []
            setFakeData(data)
        }
        setData()
    }, []);

    useEffect(() => {
        if (previous) {
            Animated.timing(x, {
                toValue: 300,
                duration: 200,
                useNativeDriver: false
            }).start()
        } else {
            Animated.timing(x, {
                toValue: 0,
                duration: 200,
                useNativeDriver: false
            }).start()
        }
            
    }, [buttonDisabled]);

    const wrapStyle = measured ? { height } : styles.measure;
    var colour = x.interpolate({
        inputRange: [0, 300],
        outputRange: ['rgba(196, 196, 196, 1)', 'rgba(255, 192, 203, 1)']
    })

    return (
        <View style={styles.root}>
            <View style={{flexDirection: "row", alignItems: "flex-end"}}> 
                <Text style={styles.title}>You have picked </Text>
                <View style={styles.container}>
                    <Text style={[styles.text, styles.measure]} onLayout={handleLayout}>0</Text>
                    <View style={[styles.row, wrapStyle]}>
                        <Tick 
                            value={first}
                            height={height}
                        />
                        <Tick 
                            value={second}
                            height={height}
                        />

                    </View>

                </View>
                <Text style={styles.title}>Items!</Text>
            </View>
            <SearchBar
                searchPhrase={searchPhrase}
                setSearchPhrase={setSearchPhrase}        
                clicked={clicked}
                setClicked={setClicked}
            />
            <List
                searchPhrase={searchPhrase}
                data={fakeData}
                setClicked={setClicked}
                save={save}
                saved={saved}
            />
            <AnimatedPressable 
                onPress={() =>{ 
                    navigation.navigate("Randomizer", {
                    data: saved
                    })
                }} 
                disabled={ buttonDisabled }
                style={ buttonDisabled ? [styles.button_disabled, {backgroundColor: colour}] : [styles.button, {backgroundColor: colour}] }
            >
                <Text style={{color: "white", fontSize: 20}}>Next</Text>
            </AnimatedPressable>
        </View>
    )
}

export default ManualScreen;

const styles = StyleSheet.create({
    root: {
        justifyContent: "center",
        alignItems: "center",
    },

    title: {
        // width: "100%",
        fontSize: 20,
        fontWeight: "bold",
    },

    button: {
        borderRadius: 15,
        // backgroundColor: "#67DB9B",
        padding: 15
    },
    button_disabled: {
        borderRadius: 15,
        // backgroundColor: "lightgrey",
        padding: 15
    },

    container: {
        // backgroundColor: "cyan",
        alignItems: "center",
        marginRight: 5,
    },
    measure: {
        opacity: 0,
    },
    text: {
         fontSize: 20,
         color: "grey",
         textAlign: "center",
    },
    row: {
        overflow: "hidden",
        flexDirection: "row",
    }
})