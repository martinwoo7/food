import React, {useState, useEffect} from 'react';
import {View, Switch, Text, FlatList} from 'react-native';


const getData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key)
      return JSON.parse(jsonValue)
  
    } catch(e) {
      console.log("Reading error", e)
    }
  }
  
const storeData = async ( key, value ) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
        console.log("Saving error", e)
    }
}
  
const UniqueSwitch = (props) => {
const [isEnabled, setIsEnabled] = useState(null)

const toggleSwitch = () => {
    const change = !isEnabled
    if (props.id == "first") {
        storeData(props.id, change)
    } else if (props.id == "second") {
        storeData(props.id, change)
    } else if (props.id == "third") {
        storeData(props.id, change)
    } else if (props.id == "fourth") {
        storeData(props.id, change)
    }
        setIsEnabled(change)
    }  

    useEffect(() => {
        const testing = async () => {
            var loaded = await getData("launched")
            if (loaded == null) {
                storeData(props.id, false)
                storeData("launched", true)
            } else {
                let ah = await getData(props.id)
                setIsEnabled(ah)
            }
        }
        testing()
    }, [])

    return (
        <>
        <Switch
            id = {props.id}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            onValueChange={toggleSwitch}
            value={isEnabled}
        />
        </>
    )
}

const clearAsyncStorage = async () => {
    AsyncStorage.clear()
    console.log("Storage Cleared")
}
// Add settings screen to something
const SettingsScreen = ({ navigation, route }) => {  

    const DATA = [
        {
        id: "first",
        title: "First Item",

        },
        {
        id: "second",
        title: "Second Item",

        },
        {
        id: "third",
        title: "Third Item",

        },
        {
        id: "fourth",
        title: "Fourth Item",

        },
    ];

    const Item = (props) => (
        <View style={{ padding: 24, borderBottomWidth: 1, alignItems: "center", flexDirection: "row", justifyContent: "space-between"}}>
            <Text>{props.title}</Text>
            <UniqueSwitch id={props.id}/>
        </View>
    );

    const renderItem = ({item}) => (
        <Item title={item.title} id={item.id}/>
    )
    return (
        <View>
            <FlatList 
                data={DATA}
                renderItem={renderItem}  
                keyExtractor={item=>item.id}
            />
        </View>
    );
}

export default SettingsScreen;
